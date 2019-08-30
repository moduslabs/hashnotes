import { EventEmitter, Injectable } from '@angular/core';
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
      year: 'numeric',
    },
  );

  public activeNotes: Array<Note> = [
    {
      content: `<h1>WebEx University Kickoff Notes</h1>
<p>Todd Wilkens: runs partner ops for CC #people</p>
<p>Eric Wilkens: Cloud ops subset, provisioning, partner help desk #people</p>
<p></p>
<h2>What is it?</h2>
<p>Training became part of BU</p>
<p>Before all revenue based, take a course and pay for it</p>
<p>Focus has shift. Gain seats, provide better service to partners adding seats.</p>
<p>Tier 1 services interface with end users, confused on tech. It's advanced, not plug & play.</p>
<p>End users go to partners, partners aren't trained. Train the trainer approach, main trainer isn't retaining everything.</p>
<p></p>
<p>Sell what we have vs what we don't have #pain-point</p>
<p></p>
<p>What can partners get in return for certifying? What is their incentive? #question</p>
<p></p>
<p>Why do 146/893 sales partner enroll but not start? #question</p>`,
      createdAt: new Date(),
      deletedAt: undefined,
      displayDate: NotesProvider.formatDate(new Date()),
      id: uuidv4(),
      updatedAt: new Date(),
    },
    {
      content: `<h1>AARP Weekly Meeting</h1>
<p>Agenda:</p>
<p>Do a rewind. Haven't thought about</p>`,
      createdAt: new Date('2019-08-29T20:05:00.000Z'),
      deletedAt: undefined,
      displayDate: NotesProvider.formatDate(
        new Date('2019-08-29T20:05:00.000Z'),
      ),
      id: uuidv4(),
      updatedAt: new Date('2019-08-29T20:05:00.000Z'),
    },
    {
      content: `<h1>Motherboard Weekly Meeting</h1>
<p>Agenda:</p>
<p>Let's start with some ideas</p>`,
      createdAt: new Date('2019-08-28T10:39:00.000Z'),
      deletedAt: undefined,
      displayDate: NotesProvider.formatDate(
        new Date('2019-08-28T10:39:00.000Z'),
      ),
      id: uuidv4(),
      updatedAt: new Date('2019-08-28T10:39:00.000Z'),
    },
    {
      content: `<h1>HashNotes Weekly Meeting</h1>
<p>Agenda:</p>
<p>Time to start hashing some notes</p>`,
      createdAt: new Date('2019-08-20T00:00:00.000Z'),
      deletedAt: undefined,
      displayDate: NotesProvider.formatDate(
        new Date('2019-08-20T00:00:00.000Z'),
      ),
      id: uuidv4(),
      updatedAt: new Date('2019-08-20T00:00:00.000Z'),
    },
  ].sort(NotesProvider.sortNotes);
  public trashNotes: Array<Note> = [].sort(NotesProvider.sortNotes);

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

  constructor() {
    if (!this.activeNotes.length) {
      this.createNote();
    }
  }

  public createNote(
    { content = NotesProvider.NEW_NOTE_CONTENT }: { content?: string } = {
      content: NotesProvider.NEW_NOTE_CONTENT,
    },
  ): Note {
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

    return note;
  }
}
