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
    this._note = !!note ? note : undefined;
    this.loadNoteToEditor();
  }
  public get note(): Note {
    return this._note;
  }

  private static readonly TAG_UNSTYLED_GLOBAL = /(?<!<span[^>]*>)#[\w\-]+/g;
  private static readonly TAG_INVALID_GLOBAL = /^#[\w\-]+$/g;

  @Output() public readonly noteEdit = new EventEmitter();
  @Output() public readonly newNoteButtonClick = new EventEmitter();
  @Output() public readonly deleteNoteButtonClick = new EventEmitter();

  public tinyMceConfig = {
    content_style: 'span.hashtag { color: #ffffff; background-color: #1b1b1b; }',
    extended_valid_elements: "span[class]",
    height: '100%',
    menu: {
      modusFile: { title: 'File', items: 'modusnewnote modusdeletenote' },
    },
    menubar: 'modusFile edit view format',
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
    },
    toolbar:
      'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | modustrash',
    valid_classes: 'hashtag'
  };
  public tinyMceApiKey = environment.tinyMceApiKey;

  public editor = undefined;

  private _note: Note;

  public updateTagElements(): void {
    // remove span elements for invalid tags
    const elementList = this.editor.$('span').toArray();
    elementList.forEach((element) => {
      if (!element.innerText.match(NoteEditorComponent.TAG_INVALID_GLOBAL)) {
        const parentNode = element.parentNode;
        while (element.firstChild) { parentNode.insertBefore(element.firstChild, element) }
        parentNode.removeChild(element)
      }
    })
    // add missing span elements
    const treeWalker = document.createTreeWalker(this.editor.dom.getRoot(), NodeFilter.SHOW_TEXT, undefined, false)
    let textNode = treeWalker.nextNode()
    while (textNode) {
      let match = NoteEditorComponent.TAG_UNSTYLED_GLOBAL.exec(textNode.textContent)
      while (match) {
        if (textNode.parentElement.className !== "hashtag") {
          const rng = document.createRange()
          rng.setStart(textNode, match.index)
          rng.setEnd(textNode, match.index + match.length + 1)
          const newElement = document.createElement("span")
          newElement.setAttribute("class", "hashtag")
          const cursor = this.editor.selection.getBookmark()
          rng.surroundContents(newElement)
          this.editor.selection.moveToBookmark(cursor)
        }
        match = NoteEditorComponent.TAG_UNSTYLED_GLOBAL.exec(textNode.textContent)
      }
      textNode = treeWalker.nextNode()
    }
  }

  public onEditorContentChange(event: any): void {
    if (!!this.note && this.note.content !== this.editor.getContent()) {
      this.updateTagElements();
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
  }

  public loadNoteToEditor(): void {
    if (!!this.editor) {
      this.editor.setContent(!!this.note && Object.prototype.hasOwnProperty.call(this.note, 'content')
      ? this.note.content
      : '');
      this.editor.focus();
    }
  }
}
