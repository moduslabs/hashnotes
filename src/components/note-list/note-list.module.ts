import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { NoteListComponent } from './note-list';

@NgModule({
  declarations: [NoteListComponent],
  exports: [NoteListComponent],
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NoteListModule {}
