import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ClipboardModule } from 'ngx-clipboard';

import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { TagSidebarComponent } from './tag-sidebar';

describe('TagSidebarComponent', () => {
  let component: TagSidebarComponent;
  let fixture: ComponentFixture<TagSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagSidebarComponent, SafeHtmlPipe],
      imports: [IonicModule.forRoot(), ClipboardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TagSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
