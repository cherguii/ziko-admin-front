import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PageArticleEditComponent } from './article-edit.component';

describe('PageArticleEditComponent', () => {
  let component: PageArticleEditComponent;
  let fixture: ComponentFixture<PageArticleEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageArticleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageArticleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
