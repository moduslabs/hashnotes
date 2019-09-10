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
  public get note(): Note {
    return this._note;
  }

  private static readonly TAG_REGEX = /^#[\w\-]+$/;
  private static readonly NOT_TAG_REGEX = /^[\w\-]/;

  @Output() public readonly noteEdit = new EventEmitter();
  @Output() public readonly newNoteButtonClick = new EventEmitter();
  @Output() public readonly deleteNoteButtonClick = new EventEmitter();

  public tinyMceConfig = {
    content_style:
      'span.hashtag { color: #ffffff; background-color: #1b1b1b; }',
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
        columns: 1,
        fetch: async (pattern) => {
          const hashtags = Array.from(document.querySelectorAll('span.hashtag')).map((element : Element) => element.textContent);
          const uniqueHashtags = [...new Set(hashtags)]
          const matchedHashtags = uniqueHashtags.filter((hashtag) => hashtag.indexOf(pattern) === 1);

          return new Promise((resolve) => {
            const results = matchedHashtags.map((hashtag) => ({
              icon: "#",
              text: hashtag.substring(1),
              value: hashtag,
            }));
            resolve(results);
          });
        },
        minChars: 0,
        onAction: (autocompleteApi, rng, value) => {
          editor.selection.setRng(rng);
          editor.insertContent(value);
          autocompleteApi.hide();
        },
      })
    },
    target_list: false,
    toolbar:
      'undo redo | styleselect | link | bold italic | numlist bullist | alignleft aligncenter alignright alignjustify | outdent indent | modustrash',
    valid_classes: 'hashtag',
  };
  public tinyMceApiKey = environment.tinyMceApiKey;

  public editor = undefined;

  private _note: Note;

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

  private updateTagElements(): void {
    this.removeInvalidTagSpans();
    this.addTagSpans();
  }

  private removeInvalidTagSpans(): void {
    const elementList = this.editor.$('span').toArray();
    elementList.forEach((element: HTMLElement): void => {
      const textAfter = element.nextSibling
        ? element.nextSibling.textContent
        : '';
      if (
        !element.innerText.match(NoteEditorComponent.TAG_REGEX) ||
        textAfter.match(NoteEditorComponent.NOT_TAG_REGEX)
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
      const match = textNode.textContent.match(/#[\w\-]+/);
      if (match) {
        if (textNode.parentElement.className !== 'hashtag') {
          const range = document.createRange();
          range.setStart(textNode, match.index);
          range.setEnd(textNode, match.index + match[0].length);

          const newElement = document.createElement('span');
          newElement.setAttribute('class', 'hashtag');

          const cursor = this.editor.selection.getBookmark();
          range.surroundContents(newElement);
          this.editor.selection.moveToBookmark(cursor);
        }
      }
      textNode = treeWalker.nextNode();
    }
  }
}
