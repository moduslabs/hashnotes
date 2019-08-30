import { Component } from '@angular/core';

import { Note } from '../../interfaces/note';
import { NotesProvider } from '../../providers/notes/notes';

@Component({
  selector: 'app-home',
  styleUrls: ['home.page.scss'],
  templateUrl: 'home.page.html',
})
export class HomePage {
  public selectedNote: Note;

  private readonly NEW_NOTE_CONTENT = '<h1></h1>';

  constructor(public notesProvider: NotesProvider) {
    if (!notesProvider.notes.length) {
      notesProvider.createNote();
    }

    this.selectedNote = notesProvider.notes[0];
  }

  public onNewNoteButtonClick(): void {
    this.selectedNote = this.notesProvider.createNote({
      content: this.NEW_NOTE_CONTENT,
    });
    document
      .getElementsByTagName('iframe')[0]
      .contentDocument.getElementsByTagName('body')[0]
      .focus();
  }

  public onNoteClick(note: Note): void {
    this.selectedNote = note;
  }

  public onContentChange(): void {
    const now = new Date();
    this.selectedNote.updatedAt = now;
    this.selectedNote.displayDate = this.notesProvider.formatDate(now);
  }
}
