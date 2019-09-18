import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage';

import { RecentHashtagsProvider } from './recent-hashtags';

describe('RecentHashtagsProvider', () => {
  let provider: RecentHashtagsProvider;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
      providers: [RecentHashtagsProvider],
    }).compileComponents();
    provider = TestBed.get(RecentHashtagsProvider);
  });

  it('should create', () => {
    expect(provider).toBeTruthy();
  });
});
