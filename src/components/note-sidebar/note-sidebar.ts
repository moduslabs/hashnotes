import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Note } from '../../interfaces/note';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hn-note-sidebar',
  styleUrls: ['note-sidebar.scss'],
  templateUrl: 'note-sidebar.html',
})
export class NoteSidebarComponent {
  @Input() public readonly selectedNoteUpdatedAt: Date;
  @Input() public readonly notes: Array<Note>;
  @Input() public readonly selectedNote: Note;
  @Input() public readonly isShowingActiveNotes: boolean;
  @Output() public readonly noteSelection = new EventEmitter();
  @Output() public readonly newNoteButtonClick = new EventEmitter();
  @Output() public readonly trashButtonClick = new EventEmitter();
  @Output() public readonly backToNoteButtonClick = new EventEmitter();

  public searchText = '';

  public get placeholderText(): string {
    return this.isShowingActiveNotes ? 'Search Notes' : 'Search Trash';
  }

  public onNewNoteButtonClick(): void {
    this.newNoteButtonClick.emit();
  }

  public onNoteSelection(note: Note): void {
    this.noteSelection.emit(note);
  }

  public onSearchChange(event: any): void {
    this.searchText = event.detail.value;
  }

  public onBackToNotesButtonClick(): void {
    this.backToNoteButtonClick.emit();
  }

  public onTrashButtonClick(): void {
    this.trashButtonClick.emit();
  }
}
