import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditorModule } from '@tinymce/tinymce-angular';

import { HomePage } from './home.page';

@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        component: HomePage,
        path: '',
      },
    ]),
    EditorModule,
  ],
})
export class HomePageModule {}
