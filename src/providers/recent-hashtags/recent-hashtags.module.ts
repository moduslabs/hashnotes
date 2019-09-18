import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { RecentHashtagsProvider } from './recent-hashtags';

@NgModule({
  declarations: [],
  exports: [],
  imports: [CommonModule],
  providers: [RecentHashtagsProvider],
})
export class RecentHashtagsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RecentHashtagsModule,
      providers: [RecentHashtagsModule],
    };
  }
  constructor(
    @Optional() @SkipSelf() readonly parentModule: RecentHashtagsModule,
  ) {
    if (parentModule) {
      throw new Error(
        'RecentHashtagsProvider is already loaded. Import it in the AppModule only',
      );
    }
  }
}
