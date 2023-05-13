import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageArticleListComponent } from './article-list.component';

describe('PageArticleListComponent', () => {
  let component: PageArticleListComponent;
  let fixture: ComponentFixture<PageArticleListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageArticleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
