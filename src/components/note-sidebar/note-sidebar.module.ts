import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { NoteListModule } from '../../components/note-list/note-list.module';

import { NoteSidebarComponent } from './note-sidebar';

@NgModule({
  declarations: [NoteSidebarComponent],
  exports: [NoteSidebarComponent],
  imports: [CommonModule, IonicModule, NoteListModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NoteSidebarModule {}
