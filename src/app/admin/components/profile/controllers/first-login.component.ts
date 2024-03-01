import {Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver} from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-first-login',
  templateUrl: '../views/first-login.component.html',
  styleUrl: '../styles/first-login.component.scss'
})
export class FirstLoginComponent {
  usuarioFormGroup = this.fb.group({
    usuario: ['', Validators.required],
  });
  emailFormGroup = this.fb.group({
    email: ['', Validators.required],
  });
  claveFormGroup = this.fb.group({
    clave: ['', Validators.required],
    confirmarClave: ['', Validators.required]
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private fb: FormBuilder,
    breakpointObserver: BreakpointObserver,
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }
}
