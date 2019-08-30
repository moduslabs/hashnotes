import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditorModule } from '@tinymce/tinymce-angular';

import { NoteEditorComponent } from './note-editor';

@NgModule({
  declarations: [NoteEditorComponent],
  exports: [NoteEditorComponent],
  imports: [CommonModule, IonicModule, FormsModule, EditorModule],
})
export class NoteEditorModule {}
