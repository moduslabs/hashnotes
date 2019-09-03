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
  public isShowingActiveNotes = true;

  constructor(public notesProvider: NotesProvider) {}

  public ngOnInit(): void {
    this.showActiveNotes();
  }

  public onNoteSelection(note: Note): void {
    this.selectedNote = note;
  }

  public onNewNoteButtonClick(): void {
    const note = this.notesProvider.createNote();
    this.notes = this.notesProvider.activeNotes;
    this.selectedNote = note;
    this.isShowingActiveNotes = true;
  }

  public onDeleteNoteButtonClick(note: Note): void {
    this.notesProvider.deleteNote(note);
    this.notes = this.isShowingActiveNotes
      ? this.notesProvider.activeNotes
      : this.notesProvider.trashNotes;
    this.selectedNote = this.notes[0];
  }

  public onTrashButtonClick(): void {
    this.isShowingActiveNotes = false;
    this.showTrashNotes();
  }

  public onBackToNoteButtonClick(): void {
    this.isShowingActiveNotes = true;
    this.showActiveNotes();
  }

  public onNoteEdit(updatedAt: Date): void {
    this.selectedNoteUpdatedAt = updatedAt;
    if (this.notes) {
      this.notes.sort(NotesProvider.sortNotes);
      this.updateNotesReference();
    }
  }

  private showActiveNotes(): void {
    this.notes = this.notesProvider.activeNotes;
    this.selectedNote = this.notes[0];
  }

  private showTrashNotes(): void {
    this.notes = this.notesProvider.trashNotes;
    this.selectedNote = this.notes[0];
  }

  // Update references to trigger OnPush updates
  private updateNotesReference(): void {
    this.notes = [...this.notes];
  }
}
