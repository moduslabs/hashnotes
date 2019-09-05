import { Component, OnInit } from '@angular/core';

import { Note } from '../../interfaces/note';
import { NotesProvider } from '../../providers/notes/notes';

@Component({
  selector: 'hn-main',
  styleUrls: ['main.scss'],
  templateUrl: 'main.html',
})
export class MainPage implements OnInit {
  public notes: Array<Note> = [];
  public selectedNote: Note;
  public selectedNoteUpdatedAt: Date;
  public isShowingActiveNotes = true;

  constructor(public notesProvider: NotesProvider) {}

  public ngOnInit(): Promise<void> {
    return this.notesProvider.initialized.then(
      (): Promise<void> => {
        this.showActiveNotes();
        return Promise.resolve();
      },
    );
  }

  public onNoteSelection(note: Note): void {
    this.selectedNote = note;
  }

  public onNewNoteButtonClick(): Promise<void> {
    return this.notesProvider.createNote().then(
      (note: Note): Promise<void> => {
        this.notes = this.notesProvider.activeNotes;
        this.selectedNote = note;
        this.isShowingActiveNotes = true;
        return Promise.resolve();
      },
    );
  }

  public onDeleteNoteButtonClick(note: Note): Promise<void> {
    return this.notesProvider.deleteNote(note).then(
      (): Promise<void> => {
        this.notes = this.isShowingActiveNotes
          ? this.notesProvider.activeNotes
          : this.notesProvider.trashNotes;
        this.selectedNote = this.notes[0];
        return Promise.resolve();
      },
    );
  }

  public onTrashButtonClick(): void {
    this.isShowingActiveNotes = false;
    this.showTrashNotes();
  }

  public onBackToNoteButtonClick(): void {
    this.isShowingActiveNotes = true;
    this.showActiveNotes();
  }

  public onNoteEdit(updatedAt: Date): Promise<void> {
    return this.notesProvider.saveNotes().then(
      (): Promise<void> => {
        this.selectedNoteUpdatedAt = updatedAt;
        if (this.notes) {
          this.notes.sort(NotesProvider.sortNotes);
          this.updateNotesReference();
        }
        return Promise.resolve();
      },
    );
  }

  private showActiveNotes(): void {
    this.notes = this.notesProvider.activeNotes;
    this.selectedNote = this.notes.length ? this.notes[0] : null;
  }

  private showTrashNotes(): void {
    this.notes = this.notesProvider.trashNotes;
    this.selectedNote = this.notes.length ? this.notes[0] : null;
  }

  // Update references to trigger OnPush updates
  private updateNotesReference(): void {
    this.notes = [...this.notes];
  }
}
