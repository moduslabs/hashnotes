import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import * as escapeStringRegexp from 'escape-string-regexp';

import { Note } from '../../interfaces/note';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hn-note-list',
  styleUrls: ['note-list.scss'],
  templateUrl: 'note-list.html',
})
export class NoteListComponent {
  @Input() public set notes(notes: Array<Note>) {
    this._notes = notes;
    this.updateFilteredNotes();
  }
  @Input() public set searchText(searchText: string) {
    this._searchText = searchText;
    this.updateFilteredNotes();
  }
  @Input() public readonly selectedNote: Note;
  @Input() public readonly selectedNoteUpdatedAt: Date;
  @Output() public readonly noteSelection = new EventEmitter();

  public get notes(): Array<Note> {
    return this._notes;
  }
  public get searchText(): string {
    return this._searchText;
  }

  public filteredNoteContainers: Array<{
    displayText: string;
    displayTitle: string;
    note: Note;
  }> = [];

  private _searchText = '';
  private _notes: Array<Note> = [];

  public onNoteClick(note: Note): void {
    this.noteSelection.emit(note);
  }

  public tracker(_index: number, note: Note): string {
    return note ? note.id : undefined;
  }

  private updateFilteredNotes(): void {
    this.filteredNoteContainers.length = 0;
    if (this.notes) {
      this.filteredNoteContainers.push(
        ...this.notes
          .filter((note: Note): boolean =>
            this.searchText
              ? !!note.content.match(
                  new RegExp(
                    `(?:[>\\s])${escapeStringRegexp(this.searchText)}`,
                    'i',
                  ),
                )
              : true,
          )
          .map((note: Note): {
            displayText: string;
            displayTitle: string;
            note: Note;
          } => {
            const noteLines = note.content
              .split('\n', 3)
              .map(
                (line: string): string =>
                  new DOMParser().parseFromString(line, 'text/html')
                    .documentElement.textContent,
              );

            return {
              displayText: `<p>${noteLines[1] || ' '}</p>\n<p>${noteLines[2] ||
                ' '}</p>`,
              displayTitle: noteLines[0] || ' ',
              note,
            };
          }),
      );
    }
  }
}
