import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxCalendarComponent } from './inbox-calendar.component';

describe('InboxCalendarComponent', () => {
  let component: InboxCalendarComponent;
  let fixture: ComponentFixture<InboxCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InboxCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
