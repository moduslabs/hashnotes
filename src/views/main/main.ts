import { Component, OnInit } from '@angular/core';

import { Note } from '../../interfaces/note';
import { NotesProvider } from '../../providers/notes/notes';

@Component({
  selector: 'hn-main',
  styleUrls: ['main.scss'],
  templateUrl: 'main.html',
})
export class MainPage implements OnInit {
  public notes: Array<Note>;
  public selectedNote: Note;
  public selectedNoteUpdatedAt: Date;

  constructor(public notesProvider: NotesProvider) {}

  public ngOnInit(): void {
    this.notes = this.notesProvider.activeNotes;
    this.selectedNote = this.notes[0];
  }

  public onNoteSelection(note: Note): void {
    this.selectedNote = note;
  }

  public onNoteEdit(updatedAt: Date): void {
    this.selectedNoteUpdatedAt = updatedAt;
    if (this.notes) {
      this.notes.sort(NotesProvider.sortNotes);
    }
  }
}
