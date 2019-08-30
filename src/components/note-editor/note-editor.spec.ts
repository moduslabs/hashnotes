import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditorModule } from '@tinymce/tinymce-angular';

import { NoteEditorComponent } from './note-editor';

describe('NoteEditorComponent', () => {
  let component: NoteEditorComponent;
  let fixture: ComponentFixture<NoteEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteEditorComponent],
      imports: [IonicModule.forRoot(), EditorModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
