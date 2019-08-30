import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { NoteListComponent } from './note-list';

@NgModule({
  declarations: [NoteListComponent],
  exports: [NoteListComponent],
  imports: [CommonModule, IonicModule],
})
export class NoteListModule {}
