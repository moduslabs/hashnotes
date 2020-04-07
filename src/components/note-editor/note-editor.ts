/* tslint:disable max-file-line-count */
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Note } from '../../interfaces/note';
import { NotesProvider } from '../../providers/notes/notes';
import { RecentHashtagsProvider } from '../../providers/recent-hashtags/recent-hashtags';

import { environment } from '../../environments/environment';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hn-note-editor',
  styleUrls: ['note-editor.scss'],
  templateUrl: 'note-editor.html',
})
export class NoteEditorComponent {
  @Input() public set note(note: Note) {
    if (!!this.editor && this._note !== note) {
      this.editor.undoManager.clear();
    }

    this._note = !!note ? note : undefined;
    this.loadNoteToEditor();
  }

  @Input() public set notes(notes: Array<Note>) {
    this._notes = notes;
  }

  public get note(): Note {
    return this._note;
  }

  public get notes(): Array<Note> {
    return this._notes;
  }

  private static readonly AUTOCOMPLETER_ATTRIBUTE_NAME =
    'data-mce-autocompleter';
  private static readonly HASHTAG_CLASSNAME = 'hashtag';
  private static readonly MAX_SUGGESTED_TAGS = 6;
  private static readonly TAG_REGEX_ENTIRE = /^#[\w-]+$/;
  private static readonly TAG_REGEX_INSIDE = /#[\w-]+/;
  private static readonly TAG_REGEX_AUTOCOMPLETE_MATCHER = /#[\w-]*$/;

  @Output() public readonly noteEdit = new EventEmitter();
  @Output() public readonly newNoteButtonClick = new EventEmitter();
  @Output() public readonly deleteNoteButtonClick = new EventEmitter();
  @Output() public readonly editorInit = new EventEmitter();

  public shortcutListPanel = {
    body: {
      items: [
        {
          cells: [
            ['Bold', 'Ctrl + B'],
            ['Italic', 'Ctrl + I'],
            ['Underline', 'Ctrl + U'],
            ['Header 1', 'Shift + Alt + 1'],
            ['Header 2', 'Shift + Alt + 2'],
            ['Header 3', 'Shift + Alt + 3'],
            ['Header 4', 'Shift + Alt + 4'],
            ['Header 5', 'Shift + Alt + 5'],
            ['Header 6', 'Shift + Alt + 6'],
            ['Paragraph', 'Shift + Alt + 7'],
            ['Insert link', 'Ctrl + K'],
          ],
          header: ['Action', 'Shortcut'],
          type: 'table',
        },
      ],
      type: 'panel',
    },
    buttons: [{ text: 'Close', type: 'cancel' }],
    title: 'Shortcut List',
  };

  public tinyMceConfig = {
    content_style:
      'span.hashtag { background-color: #1b1b1b; border-radius: 13px; color: #ffffff; line-height: 175%; padding: 0.25rem 0.5rem; }',
    extended_valid_elements: 'span[class|style]',
    height: '100%',
    link_title: false,
    menu: {
      modusFile: { title: 'File', items: 'modusnewnote modusdeletenote' },
      modusHelp: { title: 'Help', items: 'modushelp' },
    },
    menubar: 'modusFile edit insert view format modusHelp',
    plugins: 'autolink link lists',
    setup: this.onTinyMceSetup.bind(this),
    target_list: false,
    toolbar:
      'undo redo | styleselect | link | bold italic | numlist bullist | alignleft aligncenter alignright alignjustify | outdent indent | modustrash',
    valid_classes: NoteEditorComponent.HASHTAG_CLASSNAME,
  };
  public tinyMceApiKey = environment.tinyMceApiKey;

  public editor = undefined;

  private _note: Note;
  private _notes: Array<Note>;
  private isAutocompleteVisible = false;
  private previouslySelectedNode;
  private previouslySelectedNodeInnerText = '';
  private isCurrentlyEditingAHashtag = false;
  private readonly disabledShortcuts = [
    'alt+f9',
    'alt+f10',
    'alt+f11',
    'ctrl+f9',
    'ctrl+shift+f',
    'ctrl+s',
  ];

  constructor(
    private readonly notesProvider: NotesProvider,
    private readonly recentHashtagsProvider: RecentHashtagsProvider,
  ) {}

  public async onEditorContentChange(): Promise<void> {
    if (!!this.note && this.note.content !== this.editor.getContent()) {
      await this.updateTagElements();
      this.note.hashtags = this.getNoteUniqueHashtags();
      this.note.content = this.editor.getContent();
      const now = new Date();
      this.note.updatedAt = now;
      this.note.displayDate = NotesProvider.formatDate(now);
      this.noteEdit.emit(this.note.updatedAt);
    }

    return Promise.resolve();
  }

  public async onKeyUp(event: any): Promise<void> {
    const currentlySelectedNode = this.editor.selection.getNode();
    this.isCurrentlyEditingAHashtag =
      (!!currentlySelectedNode.attributes.getNamedItem(
        NoteEditorComponent.AUTOCOMPLETER_ATTRIBUTE_NAME,
      ) ||
        currentlySelectedNode.className ===
          NoteEditorComponent.HASHTAG_CLASSNAME) &&
      (this.isCurrentlyEditingAHashtag || event.event.code !== 'Backspace');

    return this.onEditorContentChange();
  }

  public async onEditorInit(event: any): Promise<void> {
    this.editor = event.editor;
    this.disabledShortcuts.forEach((shortcut: string) =>
      this.editor.shortcuts.remove(shortcut),
    );
    this.loadNoteToEditor();
    this.editorInit.emit(this.editor);

    return this.updateTagElements();
  }

  public onNodeChange(): void {
    const currentlySelectedNode = this.editor.selection.getNode();
    if (this.isLastCharacterOfHashtagDeleted({ currentlySelectedNode })) {
      this.onLastCharacterOfHashtagDeleted({ currentlySelectedNode });
    }
    this.afterNodeChange({ currentlySelectedNode });
  }

  private loadNoteToEditor(): void {
    if (!!this.editor) {
      this.editor.setContent(
        !!this.note &&
          Object.prototype.hasOwnProperty.call(this.note, 'content')
          ? this.note.content
          : '',
      );
      this.editor.focus();
    }
  }

  private getNoteHashtags(): Array<string> {
    return this.getHashtagSpans().map((element: HTMLElement) =>
      element.textContent.substring(1),
    );
  }

  private getHashtagSpans(): Array<HTMLElement> {
    const selector = `span.${NoteEditorComponent.HASHTAG_CLASSNAME}`;

    return Array.from(this.editor.$(selector));
  }

  private getNoteUniqueHashtags(): Array<string> {
    return [...new Set(this.getNoteHashtags())].sort();
  }

  private async updateTagElements(): Promise<void> {
    this.removeInvalidTagSpans();

    return this.addTagSpans();
  }

  private removeInvalidTagSpans(): void {
    const elementList = this.getHashtagSpans();
    elementList.forEach((element: HTMLElement): void => {
      if (
        !element.innerText.match(NoteEditorComponent.TAG_REGEX_ENTIRE) &&
        (!this.isAutocompleteVisible ||
          (!element.hasAttribute(
            NoteEditorComponent.AUTOCOMPLETER_ATTRIBUTE_NAME,
          ) &&
            !(
              element.childElementCount > 0 &&
              element.firstElementChild.hasAttribute(
                NoteEditorComponent.AUTOCOMPLETER_ATTRIBUTE_NAME,
              )
            )))
      ) {
        const parentNode = element.parentNode;
        while (element.firstChild) {
          parentNode.insertBefore(element.firstChild, element);
        }
        parentNode.removeChild(element);
        parentNode.normalize();
      }
    });
  }

  private async addTagSpans(): Promise<void> {
    const treeWalker = document.createTreeWalker(
      this.editor.dom.getRoot(),
      NodeFilter.SHOW_TEXT,
      undefined,
      false,
    );

    let textNode = treeWalker.nextNode();
    while (textNode) {
      const match = textNode.textContent.match(
        NoteEditorComponent.TAG_REGEX_INSIDE,
      );
      if (
        match &&
        textNode.parentElement.className !==
          NoteEditorComponent.HASHTAG_CLASSNAME &&
        !textNode.parentElement.hasAttribute(
          NoteEditorComponent.AUTOCOMPLETER_ATTRIBUTE_NAME,
        )
      ) {
        const range = document.createRange();
        range.setStart(textNode, match.index);
        range.setEnd(textNode, match.index + match[0].length);

        const newElement = document.createElement('span');
        newElement.setAttribute('class', NoteEditorComponent.HASHTAG_CLASSNAME);

        const cursor = this.editor.selection.getBookmark();
        range.surroundContents(newElement);
        this.editor.selection.moveToBookmark(cursor);

        await this.recentHashtagsProvider.addHashtag(match[0].substring(1));
      }
      textNode = treeWalker.nextNode();
    }

    return Promise.resolve();
  }

  private isLastCharacterOfHashtagDeleted({
    currentlySelectedNode,
  }: {
    currentlySelectedNode: any;
  }): boolean {
    return (
      !this.isCurrentlyEditingAHashtag &&
      ((!!currentlySelectedNode.attributes.getNamedItem(
        NoteEditorComponent.AUTOCOMPLETER_ATTRIBUTE_NAME,
      ) &&
        this.previouslySelectedNode.className ===
          NoteEditorComponent.HASHTAG_CLASSNAME &&
        currentlySelectedNode.parentNode === this.previouslySelectedNode) ||
        (currentlySelectedNode === this.previouslySelectedNode &&
          currentlySelectedNode.className ===
            NoteEditorComponent.HASHTAG_CLASSNAME)) &&
      this.previouslySelectedNodeInnerText.length ===
        (currentlySelectedNode.innerText.length as number) + 1 &&
      this.previouslySelectedNodeInnerText.substring(
        0,
        currentlySelectedNode.innerText.length,
      ) === currentlySelectedNode.innerText
    );
  }

  private onLastCharacterOfHashtagDeleted({
    currentlySelectedNode,
  }: {
    currentlySelectedNode: any;
  }): void {
    const cursor = this.editor.selection.getBookmark();
    const parentNode = currentlySelectedNode.parentNode;
    parentNode.removeChild(currentlySelectedNode);
    parentNode.normalize();
    this.editor.selection.moveToBookmark(cursor);
  }

  private afterNodeChange({
    currentlySelectedNode,
  }: {
    currentlySelectedNode: any;
  }): void {
    let hashtagChildNode;
    for (const childNode of currentlySelectedNode.childNodes) {
      if (childNode.className === NoteEditorComponent.HASHTAG_CLASSNAME) {
        hashtagChildNode = childNode;
      }
    }

    this.previouslySelectedNode = hashtagChildNode
      ? hashtagChildNode
      : currentlySelectedNode;
    this.previouslySelectedNodeInnerText = hashtagChildNode
      ? hashtagChildNode.innerText
      : this.previouslySelectedNode.innerText;
  }

  private onTinyMceSetup(editor: any): void {
    this.addTinyMceUiItems({ editor });
    this.addTinyMceAutocompleter({ editor });
  }

  private addTinyMceUiItems({ editor }: { editor: any }): void {
    editor.ui.registry.addMenuItem('modusnewnote', {
      icon: 'new-document',
      onAction: () => {
        this.newNoteButtonClick.emit();
      },
      text: 'New note',
    });
    editor.ui.registry.addMenuItem('modusdeletenote', {
      icon: 'remove',
      onAction: () => {
        this.deleteNoteButtonClick.emit(this.note);
      },
      text: 'Delete note',
    });
    editor.ui.registry.addButton('modustrash', {
      icon: 'remove',
      onAction: () => {
        this.deleteNoteButtonClick.emit(this.note);
      },
      tooltip: 'Delete note',
    });
    editor.ui.registry.addMenuItem('modushelp', {
      icon: 'help',
      onAction: () => {
        editor.windowManager.open(this.shortcutListPanel);
      },
      text: 'Shortcut list',
    });
  }

  private addTinyMceAutocompleter({ editor }: { editor: any }): void {
    editor.ui.registry.addAutocompleter(NoteEditorComponent.HASHTAG_CLASSNAME, {
      ch: '#',
      fetch: this.onTinyMceAutocompleterFetch.bind(this),
      matches: this.onTinyMceAutocompleterMatches.bind(this),
      minChars: 0,
      onAction: this.onTinyMceAutocompleterAction.bind(this),
    });
  }

  private async onTinyMceAutocompleterFetch(pattern: string): Promise<any> {
    if (pattern.length === 0) {
      return Promise.resolve(
        this.recentHashtagsProvider.hashtags.map((hashtag: string): any => ({
          text: `#${hashtag}`,
          value: `#${hashtag}`,
        })),
      );
    }

    return Promise.resolve(
      this.getAutocompleterSuggestedHashtags({ pattern }).map(
        (hashtag: string): any => ({
          text: `#${hashtag}`,
          value: `#${hashtag}`,
        }),
      ),
    );
  }

  private getAutocompleterSuggestedHashtags({
    pattern,
  }: {
    pattern: string;
  }): Array<string> {
    const allNoteUniqueHashtags = this.getAllNoteUniqueHashtagsSorted({
      pattern,
    });
    this.recentHashtagsProvider.hashtags.forEach((hashtag: string): void => {
      if (!allNoteUniqueHashtags.includes(hashtag)) {
        allNoteUniqueHashtags.push(hashtag);
      }
    });
    allNoteUniqueHashtags.sort();
    const lowerCasePattern = pattern.toLocaleLowerCase();
    const suggestedHashtags =
      pattern.length === 0
        ? allNoteUniqueHashtags
        : allNoteUniqueHashtags.filter((hashtag: string): boolean =>
            hashtag.toLocaleLowerCase().startsWith(lowerCasePattern),
          );
    suggestedHashtags.length = Math.min(
      suggestedHashtags.length,
      NoteEditorComponent.MAX_SUGGESTED_TAGS,
    );

    if (suggestedHashtags.length === 0) {
      suggestedHashtags.push(pattern);
    }

    return suggestedHashtags;
  }

  /**
   * It is necessary to use this method rather than the provider method in
   * order to account for hashtags that are currently being edited
   */
  private getAllNoteUniqueHashtagsSorted({
    pattern,
  }: {
    pattern: string;
  }): Array<string> {
    let patternCount = 0;
    const noteHashtags = this.getNoteHashtags();
    noteHashtags.forEach((hashtag: string): void => {
      if (hashtag === pattern) {
        patternCount += 1;
      }
    });
    const noteUniqueHashtags = [
      ...new Set(
        patternCount === 0
          ? noteHashtags
          : noteHashtags.filter(
              (hashtag: string): boolean => hashtag !== pattern,
            ),
      ),
    ].sort();

    const allNoteUniqueHashtags = this.notesProvider.getAllNoteUniqueHashtags({
      noteToIgnore: this.note,
    });
    noteUniqueHashtags.forEach((hashtag: string): void => {
      if (!allNoteUniqueHashtags.includes(hashtag)) {
        allNoteUniqueHashtags.push(hashtag);
      }
    });
    allNoteUniqueHashtags.sort();

    return allNoteUniqueHashtags;
  }

  private onTinyMceAutocompleterMatches(_range: Range, text: string): boolean {
    const isAMatch = !!text.match(
      NoteEditorComponent.TAG_REGEX_AUTOCOMPLETE_MATCHER,
    );
    this.isAutocompleteVisible = isAMatch;

    return isAMatch;
  }

  private async onTinyMceAutocompleterAction(
    autocompleteApi: any,
    range: any,
    hashtag: string,
  ): Promise<void> {
    this.editor.selection.setRng(range);
    this.editor.insertContent(hashtag);
    autocompleteApi.hide();

    this.isAutocompleteVisible = false;

    return this.updateTagElements();
  }
}
