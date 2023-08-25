import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinrolComponent } from '../controllers/sinrol.component';

describe('SinrolComponent', () => {
  let component: SinrolComponent;
  let fixture: ComponentFixture<SinrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinrolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
