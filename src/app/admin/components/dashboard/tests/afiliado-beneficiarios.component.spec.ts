import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadoBeneficiariosComponent } from '../controllers/afiliado-beneficiarios.component';

describe('AfiliadoBeneficiariosComponent', () => {
  let component: AfiliadoBeneficiariosComponent;
  let fixture: ComponentFixture<AfiliadoBeneficiariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AfiliadoBeneficiariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AfiliadoBeneficiariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
