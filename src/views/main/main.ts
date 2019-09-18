import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Note } from '../../interfaces/note';
import { NotesProvider } from '../../providers/notes/notes';
import { RecentHashtagsProvider } from '../../providers/recent-hashtags/recent-hashtags';

@Component({
  selector: 'hn-main',
  styleUrls: ['main.scss'],
  templateUrl: 'main.html',
})
export class MainPage implements OnInit, OnDestroy {
  public notes: Array<Note> = [];
  public selectedNote: Note;
  public selectedNoteUpdatedAt: Date;
  public isShowingActiveNotes = true;

  private activeNotesChangeSubscription: Subscription;
  private trashNotesChangeSubscription: Subscription;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly notesProvider: NotesProvider,
    private readonly recentHashtagsProvider: RecentHashtagsProvider,
  ) {}

  public async ngOnInit(): Promise<void> {
    return Promise.all([
      this.notesProvider.initialized,
      this.recentHashtagsProvider.initialized,
    ]).then(
      async (): Promise<void> => {
        this.showActiveNotes();
        this.changeDetectorRef.detectChanges();

        this.activeNotesChangeSubscription = this.notesProvider.activeNotesChange.subscribe(
          (): void => {
            if (this.isShowingActiveNotes) {
              this.showActiveNotes();
            }
            this.changeDetectorRef.detectChanges();
          },
        );
        this.trashNotesChangeSubscription = this.notesProvider.trashNotesChange.subscribe(
          (): void => {
            if (!this.isShowingActiveNotes) {
              this.showTrashNotes();
            }
            this.changeDetectorRef.detectChanges();
          },
        );

        return Promise.resolve();
      },
    );
  }

  public ngOnDestroy(): void {
    if (this.activeNotesChangeSubscription) {
      this.activeNotesChangeSubscription.unsubscribe();
    }
    if (this.trashNotesChangeSubscription) {
      this.trashNotesChangeSubscription.unsubscribe();
    }
  }

  public onNoteSelection(note: Note): void {
    this.selectedNote = note;
  }

  public async onNewNoteButtonClick(): Promise<Note> {
    this.notes = [];
    this.selectedNote = undefined;
    this.isShowingActiveNotes = true;

    return this.notesProvider.createNote();
  }

  public async onDeleteNoteButtonClick(note: Note): Promise<void> {
    this.notes = [];
    this.selectedNote = undefined;

    return this.notesProvider.deleteNote(note);
  }

  public onTrashButtonClick(): void {
    this.showTrashNotes();
  }

  public onBackToNoteButtonClick(): void {
    this.showActiveNotes();
  }

  public async onNoteEdit(updatedAt: Date): Promise<void> {
    return this.notesProvider.saveNotes().then(
      async (): Promise<void> => {
        this.selectedNoteUpdatedAt = updatedAt;
        if (this.notes) {
          this.notes.sort(NotesProvider.sortNotes);
          this.notes = [...this.notes];
        }

        return Promise.resolve();
      },
    );
  }

  private showActiveNotes(): void {
    this.isShowingActiveNotes = true;
    this.notes = [...this.notesProvider.activeNotes];
    this.selectedNote = this.notes.length ? this.notes[0] : undefined;
  }

  private showTrashNotes(): void {
    this.isShowingActiveNotes = false;
    this.notes = [...this.notesProvider.trashNotes];
    this.selectedNote = this.notes.length ? this.notes[0] : undefined;
  }
}
