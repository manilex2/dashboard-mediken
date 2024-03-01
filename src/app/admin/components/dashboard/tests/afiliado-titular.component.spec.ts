import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliadoTitularComponent } from '../controllers/afiliado-titular.component';

describe('AfiliadoTitularComponent', () => {
  let component: AfiliadoTitularComponent;
  let fixture: ComponentFixture<AfiliadoTitularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfiliadoTitularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfiliadoTitularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
