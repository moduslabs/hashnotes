import { TestBed } from '@angular/core/testing';

import { NotesProvider } from './notes';

describe('NotesProvider', () => {
  let provider: NotesProvider;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [NotesProvider],
    }).compileComponents();
    provider = TestBed.get(NotesProvider);
  });

  it('should create', () => {
    expect(provider).toBeTruthy();
  });
});
