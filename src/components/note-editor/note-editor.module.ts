import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditorModule } from '@tinymce/tinymce-angular';

import { NoteEditorComponent } from './note-editor';

@NgModule({
  declarations: [NoteEditorComponent],
  exports: [NoteEditorComponent],
  imports: [CommonModule, IonicModule, FormsModule, EditorModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NoteEditorModule {}
