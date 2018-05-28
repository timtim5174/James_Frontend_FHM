import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMainWidgetComponent } from './dashboard-main-widget.component';

describe('DashboardMainWidgetComponent', () => {
  let component: DashboardMainWidgetComponent;
  let fixture: ComponentFixture<DashboardMainWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMainWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMainWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
