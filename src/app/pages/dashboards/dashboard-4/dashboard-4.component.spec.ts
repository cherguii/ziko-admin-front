import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageDashboard4Component } from './dashboard-4.component';

describe('PageDashboard4Component', () => {
  let component: PageDashboard4Component;
  let fixture: ComponentFixture<PageDashboard4Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageDashboard4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDashboard4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
