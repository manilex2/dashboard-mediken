import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver} from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-login',
  templateUrl: '../views/first-login.component.html',
  styleUrl: '../styles/first-login.component.scss'
})
export class FirstLoginComponent implements OnInit {
  usuarioFormGroup = this.fb.group({
    usuario: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern(/^(0[1-9]|1[0-9]|2[0-4])[0-9]{8}$|^([0-9]{13})$/)]],
  });
  emailFormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
  });
  claveFormGroup = this.fb.group({
    clave: ['', [this.conditionalPasswordValidator, Validators.minLength(8), this.customPasswordValidator]],
    confirmarClave: ['', [this.conditionalPasswordValidator, this.passwordMatchValidator]]
  });
  imgFormGroup = this.fb.group({
    img: [''],
  });

  stepperOrientation: Observable<StepperOrientation>;
  matStepOptional: boolean = true;
  token = localStorage.getItem("auth_token");

  constructor(
    private fb: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {
    let tokenPayload: any = this.token? jwtDecode(this.token) : "";
    if (tokenPayload.user.firstLogin === false || tokenPayload.user.firstLogin === null) {
      this.router.navigate(["admim/dashboard"]);
    }
    this.claveFormGroup.get('clave')?.valueChanges.subscribe(() => {
      // Verificar si se ingresó algo en el campo "Contraseña"
      const claveValue = this.claveFormGroup.get('clave')?.value;
      this.matStepOptional = claveValue === '' || claveValue === null;
    });
  }

  customPasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value) {
      if (!/(?=.*[a-z])/.test(control.value)) {
        return { lowercase: true };
      }
      if (!/(?=.*[A-Z])/.test(control.value)) {
        return { uppercase: true };
      }
      if (!/(?=.*[0-9])/.test(control.value)) {
        return { digit: true };
      }
      if (!/(?=.*[$@$!%*?&,.])/.test(control.value)) {
        return { special: true };
      }
    }
    return null;
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.root.get('clave');
    const confirmPassword = control.value;
  
    if (password && confirmPassword !== password.value) {
      return { passwordMismatch: true };
    }
  
    return null;
  }

  conditionalPasswordValidator(control: AbstractControl): { [key: string]: boolean } | null  {
    const password = control.root.get('clave');
  
    if (!password) {
      return null; // Si el campo está vacío, no aplicamos la validación
    }
  
    // Si el campo tiene un valor, lo hacemos requerido
    return Validators.required(control);
  }

  handleImagenSubida(imagen: string | null) {
    this.imgFormGroup.setValue({img: imagen});
  }
}
