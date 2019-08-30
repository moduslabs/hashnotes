import { Injectable } from '@angular/core';
import * as uuidv4 from 'uuid/v4';

import { Note } from '../../interfaces/note';

@Injectable({
  providedIn: 'root',
})
export class NotesProvider {
  public notes: Array<Note> = [
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
      createdAt: new Date('2019-08-30T00:00:00.000Z'),
      deletedAt: undefined,
      id: uuidv4(),
      updatedAt: new Date('2019-08-30T00:00:00.000Z'),
    },
    {
      content: `<h1>AARP Weekly Meeting</h1>
<p>Agenda:</p>
<p>Do a rewind. Haven't thought about</p>`,
      createdAt: new Date('2019-08-29T00:00:00.000Z'),
      deletedAt: undefined,
      id: uuidv4(),
      updatedAt: new Date('2019-08-29T00:00:00.000Z'),
    },
    {
      content: `<h1>Motherboard Weekly Meeting</h1>
<p>Agenda:</p>
<p>Let's start with some ideas</p>`,
      createdAt: new Date('2019-08-28T00:00:00.000Z'),
      deletedAt: undefined,
      id: uuidv4(),
      updatedAt: new Date('2019-08-28T00:00:00.000Z'),
    },
    {
      content: `<h1>HashNotes Weekly Meeting</h1>
<p>Agenda:</p>
<p>Time to start hashing some notes</p>`,
      createdAt: new Date('2019-08-27T00:00:00.000Z'),
      deletedAt: undefined,
      id: uuidv4(),
      updatedAt: new Date('2019-08-27T00:00:00.000Z'),
    },
  ].sort(NotesProvider.sortNotes);

  private static sortNotes(noteA: Note, noteB: Note): number {
    return noteB.updatedAt.getTime() - noteA.updatedAt.getTime();
  }

  public createNote(
    { content = '' }: { content?: string } = { content: '' },
  ): Note {
    const now = new Date();
    const note = {
      content,
      createdAt: now,
      deletedAt: undefined,
      id: uuidv4(),
      updatedAt: now,
    };
    this.notes.push(note);
    this.notes.sort(NotesProvider.sortNotes);

    return note;
  }

  public tracker(_index: number, note: Note): string {
    return note ? note.id : undefined;
  }
}
