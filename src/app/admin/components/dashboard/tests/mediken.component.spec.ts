import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedikenComponent } from '../controllers/mediken.component';

describe('MedikenComponent', () => {
  let component: MedikenComponent;
  let fixture: ComponentFixture<MedikenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedikenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedikenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
