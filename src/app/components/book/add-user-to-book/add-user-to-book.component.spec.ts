import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToBookComponent } from './add-user-to-book.component';

describe('AddUserToBookComponent', () => {
  let component: AddUserToBookComponent;
  let fixture: ComponentFixture<AddUserToBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserToBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserToBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
