import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageCommandListComponent } from './command-list.component';

describe('PageCommandListComponent', () => {
  let component: PageCommandListComponent;
  let fixture: ComponentFixture<PageCommandListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCommandListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCommandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
