import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageDashboard3Component } from './dashboard-3.component';

describe('PageDashboard3Component', () => {
  let component: PageDashboard3Component;
  let fixture: ComponentFixture<PageDashboard3Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageDashboard3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDashboard3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
