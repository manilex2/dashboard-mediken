import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpisComponent } from '../controllers/kpis.component';

describe('KpisComponent', () => {
  let component: KpisComponent;
  let fixture: ComponentFixture<KpisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
