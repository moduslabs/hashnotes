import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import * as escapeStringRegexp from 'escape-string-regexp';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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

  public get notes(): Array<Note> {
    return this._notes;
  }
  public get searchText(): string {
    return this._searchText;
  }

  private static readonly ALLOWED_HTML_TAGS = [
    'STRONG',
    'EM',
    'SPAN',
    'SUB',
    'SUP',
  ];
  @Input() public readonly selectedNote: Note;
  @Input() public readonly selectedNoteUpdatedAt: Date;
  @Output() public readonly noteSelection = new EventEmitter();

  public filteredNoteContainers: Array<{
    displayText: SafeHtml;
    displayTitle: SafeHtml;
    note: Note;
  }> = [];

  private _searchText = '';
  private _notes: Array<Note> = [];

  constructor(private readonly sanitizer: DomSanitizer) {}

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
            displayText: SafeHtml;
            displayTitle: SafeHtml;
            note: Note;
          } => {
            const noteLines = note.content
              .split('\n', 3)
              .map((line: string): string => {
                const lineNode = new DOMParser().parseFromString(
                  line,
                  'text/html',
                ).documentElement;
                const lineElements = Array.from(lineNode.querySelectorAll('*'));
                const invalidElements = lineElements.filter(
                  (element: HTMLElement) =>
                    !NoteListComponent.ALLOWED_HTML_TAGS.includes(
                      element.nodeName,
                    ),
                );
                invalidElements.forEach((element: HTMLElement) => {
                  const parentNode = element.parentNode;
                  while (element.firstChild) {
                    parentNode.insertBefore(element.firstChild, element);
                  }
                  parentNode.removeChild(element);
                  parentNode.normalize();
                });

                return lineNode.innerHTML;
              });

            return {
              displayText: this.sanitizer.bypassSecurityTrustHtml(
                `<div style="overflow: hidden; text-overflow: ellipsis">
                  ${noteLines[1] || ' '}<br>${noteLines[2] || ' '}
                </div>`,
              ),
              displayTitle: this.sanitizer.bypassSecurityTrustHtml(
                noteLines[0] || ' ',
              ),
              note,
            };
          }),
      );
    }
  }
}
