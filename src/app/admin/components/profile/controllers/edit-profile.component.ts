import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/services/admin.service';
import { User } from 'src/app/auth/components/models';
import { CHANGE_PASSWORD } from 'src/app/auth/store/actions/change-password.actions';
import { LOGIN } from 'src/app/auth/store/actions/login.actions';
import { user } from 'src/app/auth/store/selectors/login.selectors';
import { Appstate } from 'src/app/shared/store/AppState';
import { setAPIStatus } from 'src/app/shared/store/actions/app.actions';
import { selectAppState } from 'src/app/shared/store/selectors/app.selectors';
import { PROFILE_IMG_UPDATE } from '../store/actions/profile-image.actions';

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
  tokenPayload: any;
  passwordChanged = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router,
    private toastr: ToastrService,
    private adminService: AdminService
  ) {}

  claveFormGroup = this.fb.group<User>({
    usuario: [''],
    email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    clave: ['', [Validators.required, Validators.minLength(8), this.customPasswordValidator]],
    confirmarClave: ['', [Validators.required, this.passwordMatchValidator]]
  });
  imgFormGroup = this.fb.group<User>({
    usuario: [''],
    img: ['', Validators.required],
  });

  ngOnInit(): void {
    this.tokenPayload = this.token? jwtDecode(this.token) : "";
    this.nombres = this.tokenPayload.user.nombres || '';
    this.nombres = this.nombres.trim();
    this.apellidos = this.tokenPayload.user.apellidos || '';
    this.apellidos = this.apellidos.trim();
    this.claveFormGroup.patchValue({
      email: this.tokenPayload.user.email
    })
    this.claveFormGroup.patchValue({
      email: this.claveFormGroup.value.email?.toString().trim()
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

  handleImagenSubida(imagen: User | null) {
    this.imgFormGroup.patchValue({img: imagen?.img});
  }

  changePassword() {
    this.claveFormGroup.patchValue({ usuario: this.tokenPayload.user.usuario })
    this.store.dispatch(CHANGE_PASSWORD({ user: this.claveFormGroup.value }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((data) => {
      if (data.apiStatus === "success" && data.changePasswordStatus === "change") {
        this.appStore.dispatch(setAPIStatus({
          apiStatus: {
            apiCodeStatus: 200,
            apiResponseMessage: '',
            apiStatus: '',
            changePasswordStatus: "changed"
          }}))
        this.toastr.success("Contraseña cambiada con exito.", "Contraseña Cambiada", {
          progressBar: true
        })
        this.store.dispatch(LOGIN({ user: this.claveFormGroup.value }));
        let apiStatus$ = this.appStore.pipe(select(selectAppState));
        apiStatus$.subscribe((data) => {
          if (data.apiStatus === "success" && data.loginStatus === "login") {
            this.appStore.dispatch(setAPIStatus({
              apiStatus: {
                apiCodeStatus: 200,
                apiResponseMessage: '',
                apiStatus: '',
                loginStatus: "logged"
              }}));
            this.store.pipe(select(user)).subscribe((data => {
              for (let i = 0; i < data.length; i++) {
                const token = data[i].token;
                localStorage.setItem('auth_token', token);
                this.passwordChanged = true; 
              }
            }))
          } else if (data.apiStatus === "error" && data.loginStatus === "logout") {
            this.appStore.dispatch(setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '', apiCodeStatus: 200 } }));
            this.toastr.error(data.apiResponseMessage, "Login", {
              progressBar: true
            })
          }
        })
      } else if (data.apiStatus === "error" && data.changePasswordStatus === "") {
        this.appStore.dispatch(setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '', apiCodeStatus: 200 } }));
        this.toastr.error(data.apiResponseMessage, "Cambiar Contraseña", {
          progressBar: true
        })
      }
    })
  }

  goHomePage() {
    if (this.tokenPayload.user.firstLogin === true) {
      this.router.navigate(['admin/profile/first-login']);
    } else if (this.tokenPayload.user.tipoUsuario === "Beneficiario") {
      this.router.navigate(['admin/dashboard/beneficiario']);
    } else if (this.tokenPayload.user.tipoUsuario === "AfiliadoTitular") {
      this.router.navigate(['admin/dashboard/afiliado-titular']);
    } else if (this.tokenPayload.user.tipoUsuario === "Broker") {
      this.router.navigate(['admin/dashboard/brokers']);
    } else if (this.adminService.tieneRol()) {
      this.router.navigate(['admin/dashboard/resumen']);
    } else {
      this.router.navigate(['admin/dashboard/sinrol']);
    }
  }

  updateImg() {
    this.imgFormGroup.patchValue({ usuario: this.tokenPayload.user.usuario })
    this.store.dispatch(PROFILE_IMG_UPDATE({ user: this.imgFormGroup.value }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((data) => {
      if (data.apiStatus === "success" && data.profileImageStatus === "update") {
        this.appStore.dispatch(setAPIStatus({
          apiStatus: {
            apiCodeStatus: 200,
            apiResponseMessage: '',
            apiStatus: '',
            changePasswordStatus: "updated"
          }}))
        this.toastr.success("Imágen actualizada con exito.", "Actualizar Imágen", {
          progressBar: true
        })
        this.imgSubida = true;
      } else if (data.apiStatus === "error" && data.changePasswordStatus === "") {
        this.appStore.dispatch(setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '', apiCodeStatus: 200 } }));
        this.toastr.error(data.apiResponseMessage, "Actualizar Imágen", {
          progressBar: true
        })
      }
    })
  }
}
