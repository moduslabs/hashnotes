import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Note } from '../../interfaces/note';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hn-tag-sidebar',
  styleUrls: ['tag-sidebar.scss'],
  templateUrl: 'tag-sidebar.html',
})
export class TagSidebarComponent {
  private _note: Note;

  @Input() public set note(note: Note) {
    this._note = note;
  }
  public get note(): Note {
    return this._note;
  }
}
