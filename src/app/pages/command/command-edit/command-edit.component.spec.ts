import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PageCommandEditComponent } from './command-edit.component';

describe('PageCommandEditComponent', () => {
  let component: PageCommandEditComponent;
  let fixture: ComponentFixture<PageCommandEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCommandEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCommandEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
