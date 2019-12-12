import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { NotesProvider } from './notes';

@NgModule({
  declarations: [],
  exports: [],
  imports: [CommonModule],
  providers: [NotesProvider],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NotesModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NotesModule,
      providers: [NotesModule],
    };
  }
  constructor(@Optional() @SkipSelf() readonly parentModule: NotesModule) {
    if (parentModule) {
      throw new Error(
        'NotesProvider is already loaded. Import it in the AppModule only',
      );
    }
  }
}
