import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { NoteEditorModule } from '../../components/note-editor/note-editor.module';
import { NoteSidebarModule } from '../../components/note-sidebar/note-sidebar.module';
import { TagSidebarModule } from '../../components/tag-sidebar/tag-sidebar.module';

import { MainPage } from './main';

@NgModule({
  declarations: [MainPage],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        component: MainPage,
        path: '',
      },
    ]),
    NoteSidebarModule,
    NoteEditorModule,
    TagSidebarModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainPageModule {}
