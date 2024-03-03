import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-edit-profile',
  templateUrl: '../views/edit-profile.component.html',
  styleUrl: '../styles/edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {
  nombres = "";
  apellidos = "";
  token = localStorage.getItem("auth_token");
  imgSubida = false;
  hide = true;

  constructor(
    private fb: FormBuilder
  ) {}

  claveFormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    clave: ['', [Validators.required, Validators.minLength(8), this.customPasswordValidator]],
    confirmarClave: ['', [Validators.required, this.passwordMatchValidator]]
  });
  imgFormGroup = this.fb.group({
    img: [''],
  });

  ngOnInit(): void {
    let tokenPayload: any = this.token? jwtDecode(this.token) : "";
    console.log(tokenPayload);
    this.nombres = tokenPayload.user.nombres || '';
    this.nombres = this.nombres.trim();
    this.apellidos = tokenPayload.user.apellidos || '';
    this.apellidos = this.apellidos.trim();
    this.claveFormGroup.patchValue({
      email: tokenPayload.user.email
    })
    this.claveFormGroup.patchValue({
      email: this.claveFormGroup.value.email?.trim()
    })

    this.claveFormGroup.get('clave')?.valueChanges.subscribe(() => {
      this.claveFormGroup.get('clave')?.errors? this.claveFormGroup.get('confirmarClave')?.disable() : this.claveFormGroup.get('confirmarClave')?.enable();
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

  conditionalEmailValidator(control: AbstractControl): { [key: string]: boolean } | null  {
    const email = control.root.get('email');
  
    if (email) {
      return null; // Si el campo existe, no aplicamos la validación
    }
  
    // Si el campo no tiene un valor, lo hacemos requerido
    return Validators.required(control);
  }

  handleImagenSubida(imagen: string | null) {
    this.imgFormGroup.setValue({img: imagen});
  }
}
