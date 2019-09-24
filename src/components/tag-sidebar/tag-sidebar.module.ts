import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ClipboardModule } from 'ngx-clipboard';

import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { TagSidebarComponent } from './tag-sidebar';

@NgModule({
  declarations: [TagSidebarComponent, SafeHtmlPipe],
  exports: [TagSidebarComponent],
  imports: [CommonModule, IonicModule, ClipboardModule],
})
export class TagSidebarModule {}
