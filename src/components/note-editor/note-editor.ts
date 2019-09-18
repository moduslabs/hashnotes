import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Note } from '../../interfaces/note';
import { NotesProvider } from '../../providers/notes/notes';

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
  private static readonly MAX_SUGGESTED_TAGS = 6;
  private static readonly TAG_REGEX_ENTIRE = /^#[\w-]+$/;
  private static readonly TAG_REGEX_INSIDE = /#[\w-]+/;
  private static readonly TAG_REGEX_AUTOCOMPLETE_MATCHER = /#[\w-]*$/;

  @Output() public readonly noteEdit = new EventEmitter();
  @Output() public readonly newNoteButtonClick = new EventEmitter();
  @Output() public readonly deleteNoteButtonClick = new EventEmitter();
  @Output() public readonly editorInit = new EventEmitter();

  public tinyMceConfig = {
    content_style:
      'span.hashtag { background-color: #1b1b1b; border-radius: 13px; color: #ffffff; display: inline-block; padding: 0.25rem 0.5rem; word-break: break-all; }',
    extended_valid_elements: 'span[class]',
    height: '100%',
    link_title: false,
    menu: {
      modusFile: { title: 'File', items: 'modusnewnote modusdeletenote' },
    },
    menubar: 'modusFile edit insert view format',
    plugins: 'autolink link lists',
    setup: (editor) => {
      editor.ui.registry.addMenuItem('modusnewnote', {
        onAction: () => {
          this.newNoteButtonClick.emit();
        },
        text: 'New note',
      });
      editor.ui.registry.addMenuItem('modusdeletenote', {
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
      editor.ui.registry.addAutocompleter('hashtag', {
        ch: '#',
        fetch: async (pattern: string) => {
          const lowerCasePattern = pattern.toLocaleLowerCase();

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

          const allNoteUniqueHashtags = this.notesProvider.getAllNoteUniqueHashtags(
            { noteToIgnore: this.note },
          );
          noteUniqueHashtags.forEach((hashtag: string): void => {
            if (!allNoteUniqueHashtags.includes(hashtag)) {
              allNoteUniqueHashtags.push(hashtag);
            }
          });
          allNoteUniqueHashtags.sort();

          const suggestedTags =
            pattern.length === 0
              ? allNoteUniqueHashtags
              : allNoteUniqueHashtags.filter((hashtag: string): boolean =>
                  hashtag.toLocaleLowerCase().startsWith(lowerCasePattern),
                );
          suggestedTags.length = Math.min(
            suggestedTags.length,
            NoteEditorComponent.MAX_SUGGESTED_TAGS,
          );

          if (suggestedTags.length === 0) {
            suggestedTags.push(pattern);
          }

          return Promise.resolve(
            suggestedTags.map((hashtag: string): any => ({
              text: `#${hashtag}`,
              value: `#${hashtag}`,
            })),
          );
        },
        matches: (_range: Range, text: string): boolean => {
          const isAMatch = !!text.match(
            NoteEditorComponent.TAG_REGEX_AUTOCOMPLETE_MATCHER,
          );
          this.isAutocompleteVisible = isAMatch;

          return isAMatch;
        },
        minChars: 0,
        onAction: (autocompleteApi: any, range: any, hashtag: string): void => {
          editor.selection.setRng(range);
          editor.insertContent(hashtag);
          autocompleteApi.hide();

          this.isAutocompleteVisible = false;
          this.updateTagElements();
        },
      });
    },
    target_list: false,
    toolbar:
      'undo redo | styleselect | link | bold italic | numlist bullist | alignleft aligncenter alignright alignjustify | outdent indent | modustrash',
    valid_classes: 'hashtag',
  };
  public tinyMceApiKey = environment.tinyMceApiKey;

  public editor = undefined;

  private _note: Note;
  private _notes: Array<Note>;
  private isAutocompleteVisible = false;

  constructor(private readonly notesProvider: NotesProvider) {}

  public onEditorContentChange(): void {
    if (!!this.note && this.note.content !== this.editor.getContent()) {
      this.updateTagElements();
      this.note.hashtags = this.getNoteUniqueHashtags();
      this.note.content = this.editor.getContent();
      const now = new Date();
      this.note.updatedAt = now;
      this.note.displayDate = NotesProvider.formatDate(now);
      this.noteEdit.emit(this.note.updatedAt);
    }
  }

  public onEditorInit(event: any): void {
    this.editor = event.editor;
    this.loadNoteToEditor();
    this.updateTagElements();
    this.editorInit.emit(this.editor);
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
    return Array.from(this.editor.$('span.hashtag')).map(
      (element: HTMLElement) => element.textContent.substring(1),
    );
  }

  private getNoteUniqueHashtags(): Array<string> {
    return [...new Set(this.getNoteHashtags())].sort();
  }

  private updateTagElements(): void {
    this.removeInvalidTagSpans();
    this.addTagSpans();
  }

  private removeInvalidTagSpans(): void {
    const elementList = this.editor.$('span').toArray();
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

  private addTagSpans(): void {
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
        textNode.parentElement.className !== 'hashtag' &&
        !textNode.parentElement.hasAttribute(
          NoteEditorComponent.AUTOCOMPLETER_ATTRIBUTE_NAME,
        )
      ) {
        const range = document.createRange();
        range.setStart(textNode, match.index);
        range.setEnd(textNode, match.index + match[0].length);

        const newElement = document.createElement('span');
        newElement.setAttribute('class', 'hashtag');

        const cursor = this.editor.selection.getBookmark();
        range.surroundContents(newElement);
        this.editor.selection.moveToBookmark(cursor);
      }
      textNode = treeWalker.nextNode();
    }
  }
}
