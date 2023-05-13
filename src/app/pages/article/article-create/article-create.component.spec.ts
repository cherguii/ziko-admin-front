import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageArticleCreateComponent } from './article-create.component';

describe('PageArticleCreateComponent', () => {
  let component: PageArticleCreateComponent;
  let fixture: ComponentFixture<PageArticleCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageArticleCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageArticleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
