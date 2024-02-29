import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordResetComponent } from '../controllers/change-password-reset.component';

describe('ChangePasswordResetComponent', () => {
  let component: ChangePasswordResetComponent;
  let fixture: ComponentFixture<ChangePasswordResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordResetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
