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
    this.noteContent =
      !!note && Object.prototype.hasOwnProperty.call(note, 'content')
        ? note.content
        : '';
    setTimeout(NoteEditorComponent.focusOnEditor, 0);
  }
  public get note(): Note {
    return this._note;
  }

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

  public noteContent = '';

  private _note: Note;

  private static focusOnEditor(): void {
    // Focus on the editor when note changes
    // Note: There's probably a more ng-friendly way to do this
    const iFrames = document.getElementsByTagName('iframe');
    if (iFrames.length) {
      const iFrameBodies = iFrames[0].contentDocument.getElementsByTagName(
        'body',
      );

      if (iFrameBodies.length) {
        iFrameBodies[0].focus();
      }
    }
  }

  public processTags(content: string) {
    const removedTagMarkers = content.replace(/<span[^>]*>(.*?)<\/span>/g, '$1');
    const processed = removedTagMarkers.replace(/(?<!<span[^>]*>)#[\w\-]+/g, '<span class="hashtag">$&</span>');
    return processed;
  }

  public onEditorContentChange(event: any): void {
    if (!!this.note && this.note.content !== this.noteContent) {
      this.noteContent = this.processTags(this.noteContent);
      this.note.content = this.noteContent;
      const now = new Date();
      this.note.updatedAt = now;
      this.note.displayDate = NotesProvider.formatDate(now);
      this.noteEdit.emit(this.note.updatedAt);
    }
  }

  public onEditorInit(): void {
    NoteEditorComponent.focusOnEditor();
  }
}
