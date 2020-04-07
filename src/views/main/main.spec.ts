import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { EditorModule } from '@tinymce/tinymce-angular';

import { NoteEditorModule } from '../../components/note-editor/note-editor.module';
import { NoteSidebarModule } from '../../components/note-sidebar/note-sidebar.module';
import { TagSidebarModule } from '../../components/tag-sidebar/tag-sidebar.module';

import { MainPage } from './main';

describe('MainPage', () => {
  let component: MainPage;
  let fixture: ComponentFixture<MainPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPage],
      imports: [
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        EditorModule,
        FormsModule,
        NoteEditorModule,
        NoteSidebarModule,
        TagSidebarModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
