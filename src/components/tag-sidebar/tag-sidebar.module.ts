import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ClipboardModule } from 'ngx-clipboard';

import { TagSidebarComponent } from './tag-sidebar';

@NgModule({
  declarations: [TagSidebarComponent],
  exports: [TagSidebarComponent],
  imports: [CommonModule, IonicModule, ClipboardModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TagSidebarModule {}
