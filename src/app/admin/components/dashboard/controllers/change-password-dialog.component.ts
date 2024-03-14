import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/auth/components/models';

export interface DialogData {
  user: any;
  notification: number;
}

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: '../views/change-password-dialog.component.html',
  styleUrl: '../styles/change-password-dialog.component.scss'
})

export class ChangePasswordDialogComponent implements OnInit {
  hide = true;
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
  ) {}

  claveFormGroup = this.fb.group<User>({
    usuario: [''],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    clave: ['', [Validators.required, Validators.minLength(8), this.customPasswordValidator]],
    confirmarClave: ['', [Validators.required, this.passwordMatchValidator]]
  });

  ngOnInit(): void {
    this.claveFormGroup.patchValue({email: this.data.user.email?? null, usuario: this.data.user.usuario?? null})
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
}
