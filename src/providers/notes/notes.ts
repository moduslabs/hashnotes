import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as uuidv4 from 'uuid/v4';

import { Note } from '../../interfaces/note';

@Injectable({
  providedIn: 'root',
})
export class NotesProvider {
  private static readonly NEW_NOTE_CONTENT = '<h1></h1>';
  private static readonly DATE_FORMAT_WEEKDAY = new Intl.DateTimeFormat(
    undefined,
    {
      weekday: 'long',
    },
  );
  private static readonly DATE_FORMAT_TIME = new Intl.DateTimeFormat(
    undefined,
    {
      hour: '2-digit',
      hour12: true,
      minute: '2-digit',
    },
  );
  private static readonly DATE_FORMAT_OLDER_THAN_A_WEEK = new Intl.DateTimeFormat(
    undefined,
    {
      day: '2-digit',
      month: '2-digit',
      weekday: 'short',
      year: 'numeric',
    },
  );

  public activeNotes: Array<Note> = [];
  public trashNotes: Array<Note> = [];

  public initialized: Promise<void>;

  public static formatDate(date: Date): string {
    const now = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    if (date.toDateString() === now.toDateString()) {
      return `Today, ${NotesProvider.DATE_FORMAT_TIME.format(date)}`;
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${NotesProvider.DATE_FORMAT_TIME.format(date)}`;
    }
    if (date.getTime() > oneWeekAgo.getTime()) {
      return `${NotesProvider.DATE_FORMAT_WEEKDAY.format(
        date,
      )}, ${NotesProvider.DATE_FORMAT_TIME.format(date)}`;
    }

    return NotesProvider.DATE_FORMAT_OLDER_THAN_A_WEEK.format(date);
  }

  public static sortNotes(noteA: Note, noteB: Note): number {
    return noteB.updatedAt.getTime() - noteA.updatedAt.getTime();
  }

  constructor(private storage: Storage) {
    this.initialized = this.loadNotes().then(
      (): Promise<void> => {
        if (!this.activeNotes.length) {
          this.createNote();
          return this.saveNotes();
        }
        return Promise.resolve();
      },
    );
  }

  public createNote(
    { content = NotesProvider.NEW_NOTE_CONTENT }: { content?: string } = {
      content: NotesProvider.NEW_NOTE_CONTENT,
    },
  ): Promise<Note> {
    const now = new Date();
    const note = {
      content,
      createdAt: now,
      deletedAt: undefined,
      displayDate: NotesProvider.formatDate(now),
      id: uuidv4(),
      updatedAt: now,
    };

    this.activeNotes.push(note);
    this.activeNotes.sort(NotesProvider.sortNotes);
    this.updateActiveNotesReference();

    return this.saveNotes().then((): Promise<Note> => Promise.resolve(note));
  }

  public deleteNote(note: Note): Promise<void> {
    if (this.activeNotes.includes(note)) {
      const deletedNotes = this.activeNotes.splice(
        this.activeNotes.indexOf(note),
        1,
      );
      this.trashNotes.push(...deletedNotes);
      this.trashNotes.sort(NotesProvider.sortNotes);
      if (!this.activeNotes.length) {
        this.createNote();
      }
      this.updateActiveNotesReference();
      this.updateTrashNotesReference();
    } else if (this.trashNotes.includes(note)) {
      this.trashNotes.splice(this.trashNotes.indexOf(note), 1);
      this.updateTrashNotesReference();
    }
    return this.saveNotes();
  }

  public saveNotes(): Promise<void> {
    return this.storage.set('notes', {
      activeNotes: this.activeNotes,
      trashNotes: this.trashNotes,
    });
  }

  private loadNotes(): Promise<void> {
    return this.storage.get('notes').then(
      (notesAsJson: any): Promise<void> => {
        const notes = notesAsJson ? notesAsJson : {};
        this.activeNotes = Object.prototype.hasOwnProperty.call(
          notes,
          'activeNotes',
        )
          ? notes.activeNotes
          : [];
        this.trashNotes = Object.prototype.hasOwnProperty.call(
          notes,
          'trashNotes',
        )
          ? notes.trashNotes
          : [];
        return Promise.resolve();
      },
    );
  }

  // Update references to trigger OnPush updates
  private updateActiveNotesReference(): void {
    this.activeNotes = [...this.activeNotes];
  }

  // Update references to trigger OnPush updates
  private updateTrashNotesReference(): void {
    this.trashNotes = [...this.trashNotes];
  }
}
