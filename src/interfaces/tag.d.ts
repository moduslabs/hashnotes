import { SafeHtml } from '@angular/platform-browser';

export interface Tag {
  content: string[];
  name: string;
  safeContent: SafeHtml[];
}
