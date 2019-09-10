import { EventEmitter, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
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
  private static readonly TOAST_NOTE_DELETION_CLOSE_BUTTON_TEXT = 'Dismiss';
  private static readonly TOAST_NOTE_DELETION_CSS_CLASS = 'toast-note-deletion';
  private static readonly TOAST_NOTE_DELETION_DURATION = 1000 * 4;
  private static readonly TOAST_NOTE_DELETION_ACTIVE_HEADER =
    'Moved 1 item to the trash.';
  private static readonly TOAST_NOTE_DELETION_TRASH_HEADER =
    'Permanently deleted 1 item.';
  private static readonly TOAST_NOTE_DELETION_POSITION = 'bottom';

  public activeNotes: Array<Note> = [];
  public trashNotes: Array<Note> = [];

  public initialized: Promise<void>;

  public activeNotesChange: EventEmitter<void> = new EventEmitter();
  public trashNotesChange: EventEmitter<void> = new EventEmitter();

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

  private static getTomorrowZeroed(): Date {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0);
    tomorrow.setMinutes(0);
    tomorrow.setSeconds(0);
    tomorrow.setMilliseconds(0);

    return tomorrow;
  }

  constructor(
    private readonly storage: Storage,
    private readonly toastCtrl: ToastController,
  ) {
    this.initialized = this.loadNotes().then(
      async (): Promise<void> => {
        if (!this.activeNotes.length) {
          return this.createNote().then(
            async (): Promise<void> => Promise.resolve(),
          );
        }

        return Promise.resolve();
      },
    );
    this.scheduleDailyDisplayDatesRefresh();
  }

  public async createNote(
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
      tags: [],
      updatedAt: now,
    };

    this.activeNotes.push(note);
    this.activeNotes.sort(NotesProvider.sortNotes);
    this.activeNotesChange.emit();

    return this.saveNotes().then(
      async (): Promise<Note> => Promise.resolve(note),
    );
  }

  public async deleteNote(note: Note): Promise<void> {
    if (this.activeNotes.includes(note)) {
      const noteLocation = 'ACTIVE';
      const deletedNotes = this.activeNotes.splice(
        this.activeNotes.indexOf(note),
        1,
      );
      this.trashNotes.push(...deletedNotes);
      this.trashNotes.sort(NotesProvider.sortNotes);
      this.activeNotesChange.emit();
      this.trashNotesChange.emit();

      const createOrSavePromise = this.activeNotes.length
        ? this.saveNotes()
        : this.createNote().then(async (): Promise<void> => Promise.resolve());

      return createOrSavePromise.then(
        async (): Promise<void> =>
          this.presentDeletionToast({ note, noteLocation }),
      );
    }
    if (this.trashNotes.includes(note)) {
      const noteLocation = 'TRASH';
      this.trashNotes.splice(this.trashNotes.indexOf(note), 1);
      this.trashNotesChange.emit();

      return this.saveNotes().then(
        async (): Promise<void> =>
          this.presentDeletionToast({ note, noteLocation }),
      );
    }

    return Promise.resolve();
  }

  public async saveNotes(): Promise<void> {
    return this.storage.set('notes', {
      activeNotes: this.activeNotes,
      trashNotes: this.trashNotes,
    });
  }

  private async loadNotes(): Promise<void> {
    return this.storage.get('notes').then(
      async (notesAsJson: any): Promise<void> => {
        const notes = notesAsJson ? notesAsJson : {};
        this.activeNotes = Object.prototype.hasOwnProperty.call(
          notes,
          'activeNotes',
        )
          ? notes.activeNotes.map(
              (note: Note): Note => {
                note.displayDate = NotesProvider.formatDate(note.updatedAt);

                return note;
              },
            )
          : [];
        this.trashNotes = Object.prototype.hasOwnProperty.call(
          notes,
          'trashNotes',
        )
          ? notes.trashNotes.map(
              (note: Note): Note => {
                note.displayDate = NotesProvider.formatDate(note.updatedAt);

                return note;
              },
            )
          : [];

        return Promise.resolve();
      },
    );
  }

  private async restoreNote({
    note,
    noteLocation,
  }: {
    note: Note;
    noteLocation: 'ACTIVE' | 'TRASH';
  }): Promise<void> {
    if (noteLocation === 'ACTIVE') {
      this.trashNotes.splice(this.trashNotes.indexOf(note), 1);
      this.activeNotes.push(note);
      this.activeNotes.sort(NotesProvider.sortNotes);
      this.activeNotesChange.emit();
      this.trashNotesChange.emit();
    } else {
      this.trashNotes.push(note);
      this.trashNotes.sort(NotesProvider.sortNotes);
      this.trashNotesChange.emit();
    }

    return this.saveNotes();
  }

  private async presentDeletionToast({
    note,
    noteLocation,
  }: {
    note: Note;
    noteLocation: 'ACTIVE' | 'TRASH';
  }): Promise<void> {
    return this.toastCtrl
      .create({
        buttons: [
          {
            handler: async (): Promise<boolean> =>
              this.restoreNote({ note, noteLocation }).then(
                async (): Promise<boolean> => Promise.resolve(true),
              ),
            side: 'end',
            text: 'Cancel',
          },
        ],
        closeButtonText: NotesProvider.TOAST_NOTE_DELETION_CLOSE_BUTTON_TEXT,
        cssClass: NotesProvider.TOAST_NOTE_DELETION_CSS_CLASS,
        duration: NotesProvider.TOAST_NOTE_DELETION_DURATION,
        header:
          noteLocation === 'ACTIVE'
            ? NotesProvider.TOAST_NOTE_DELETION_ACTIVE_HEADER
            : NotesProvider.TOAST_NOTE_DELETION_TRASH_HEADER,
        position: NotesProvider.TOAST_NOTE_DELETION_POSITION,
        showCloseButton: true,
      })
      .then(
        async (toast: any): Promise<void> => {
          toast.present();

          return Promise.resolve();
        },
      );
  }

  private scheduleDailyDisplayDatesRefresh(): void {
    const now = new Date();
    const tomorrow = NotesProvider.getTomorrowZeroed();
    const milliseconds = tomorrow.getTime() - now.getTime();
    setTimeout((): void => {
      this.refreshDisplayDates();
      this.scheduleDailyDisplayDatesRefresh();
    }, milliseconds);
  }

  private refreshDisplayDates(): void {
    this.activeNotes = this.activeNotes.map(
      (note: Note): Note => {
        note.displayDate = NotesProvider.formatDate(note.updatedAt);

        return note;
      },
    );
    this.trashNotes = this.trashNotes.map(
      (note: Note): Note => {
        note.displayDate = NotesProvider.formatDate(note.updatedAt);

        return note;
      },
    );

    this.activeNotesChange.emit();
    this.trashNotesChange.emit();
  }
}
