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
  selector: 'hn-note-sidebar',
  styleUrls: ['note-sidebar.scss'],
  templateUrl: 'note-sidebar.html',
})
export class NoteSidebarComponent {
  @Input() public readonly selectedNoteUpdatedAt: Date;
  @Input() public readonly notes: Array<Note>;
  @Input() public readonly selectedNote: Note;
  @Output() public readonly noteSelection = new EventEmitter();

  public searchText = '';

  constructor(public notesProvider: NotesProvider) {}

  public onNewNoteButtonClick(): void {
    const note = this.notesProvider.createNote();
    this.noteSelection.emit(note);
  }

  public onNoteSelection(note: Note): void {
    this.noteSelection.emit(note);
  }

  public onSearchChange(event: any): void {
    this.searchText = event.detail.value;
  }
}
