import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage';

import { NotesProvider } from './notes';

describe('NotesProvider', () => {
  let provider: NotesProvider;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
      providers: [NotesProvider],
    }).compileComponents();
    provider = TestBed.get(NotesProvider);
  });

  it('should create', () => {
    expect(provider).toBeTruthy();
  });
});
