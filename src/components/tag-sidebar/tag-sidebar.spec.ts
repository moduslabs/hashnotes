import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TagSidebarComponent } from './tag-sidebar';

describe('TagSidebarComponent', () => {
  let component: TagSidebarComponent;
  let fixture: ComponentFixture<TagSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagSidebarComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TagSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
