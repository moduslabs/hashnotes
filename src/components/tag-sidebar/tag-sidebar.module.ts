import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { TagSidebarComponent } from './tag-sidebar';

@NgModule({
  declarations: [TagSidebarComponent],
  exports: [TagSidebarComponent],
  imports: [CommonModule, IonicModule],
})
export class TagSidebarModule {}
