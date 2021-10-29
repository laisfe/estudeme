import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIdComponent } from './report-id.component';

describe('ReportIdComponent', () => {
  let component: ReportIdComponent;
  let fixture: ComponentFixture<ReportIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
