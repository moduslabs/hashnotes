import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Note } from '../../interfaces/note';
import { NotesProvider } from '../../providers/notes/notes';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hn-note-editor',
  styleUrls: ['note-editor.scss'],
  templateUrl: 'note-editor.html',
})
export class NoteEditorComponent {
  @Input() public set note(note: Note) {
    this._note = note;
    this._noteContent = note.content;
    NoteEditorComponent.focusOnEditor();
  }
  public get note(): Note {
    return this._note;
  }

  @Output() public readonly noteEdit = new EventEmitter();

  private _note: Note;
  private _noteContent: string;

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

  public onEditorContentChange(): void {
    if (this.note.content !== this._noteContent) {
      this._noteContent = this.note.content;
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
