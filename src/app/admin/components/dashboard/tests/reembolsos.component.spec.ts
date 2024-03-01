import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReembolsosComponent } from '../controllers/reembolsos.component';

describe('ReembolsosComponent', () => {
  let component: ReembolsosComponent;
  let fixture: ComponentFixture<ReembolsosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReembolsosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReembolsosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
