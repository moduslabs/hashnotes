import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Note } from '../../interfaces/note';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hn-note-list',
  styleUrls: ['note-list.scss'],
  templateUrl: 'note-list.html',
})
export class NoteListComponent {
  @Input() public readonly notes: Array<Note>;
  @Input() public readonly selectedNote: Note;
  @Input() public readonly selectedNoteUpdatedAt: Date;
  @Output() public readonly noteSelection = new EventEmitter();

  public onNoteClick(note: Note): void {
    this.noteSelection.emit(note);
  }

  public tracker(_index: number, note: Note): string {
    return note ? note.id : undefined;
  }
}
