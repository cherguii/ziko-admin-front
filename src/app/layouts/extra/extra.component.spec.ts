import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExtraLayoutComponent } from './extra.component';

describe('ExtraLayoutComponent', () => {
  let component: ExtraLayoutComponent;
  let fixture: ComponentFixture<ExtraLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
