import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardNotificationComponent } from './standard-notification.component';

xdescribe('StandardNotificationComponent', () => {
  let component: StandardNotificationComponent;
  let fixture: ComponentFixture<StandardNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
