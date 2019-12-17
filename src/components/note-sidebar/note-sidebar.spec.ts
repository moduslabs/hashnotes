import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoteListModule } from '../../components/note-list/note-list.module';

import { NoteSidebarComponent } from './note-sidebar';

describe('NoteSidebarComponent', () => {
  let component: NoteSidebarComponent;
  let fixture: ComponentFixture<NoteSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteSidebarComponent],
      imports: [IonicModule.forRoot(), NoteListModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
