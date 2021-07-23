import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudemeComponent } from './estudeme.component';

describe('EstudemeComponent', () => {
  let component: EstudemeComponent;
  let fixture: ComponentFixture<EstudemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
