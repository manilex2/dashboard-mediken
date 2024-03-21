import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver} from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/components/models';
import { Store, select } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/AppState';
import { AdminService } from 'src/app/admin/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { FIRST_LOGIN } from '../store/actions/first-login.actions';
import { selectAppState } from 'src/app/shared/store/selectors/app.selectors';
import { setAPIStatus } from 'src/app/shared/store/actions/app.actions';
import { LOGIN } from 'src/app/auth/store/actions/login.actions';
import { user } from 'src/app/auth/store/selectors/login.selectors';

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

  userFinal: User | null = null;
  stepperOrientation: Observable<StepperOrientation>;
  matStepOptional: boolean = true;
  token = localStorage.getItem("auth_token");
  tokenPayload: any = null;

  constructor(
    private fb: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>,
    private toastr: ToastrService,
    private adminService: AdminService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {
    this.tokenPayload = this.token? jwtDecode(this.token) : "";
    if (this.tokenPayload.user.firstLogin === false || this.tokenPayload.user.firstLogin === null) {
      this.router.navigate(["admim/dashboard"]);
    }
    this.usuarioFormGroup.setValue({usuario: this.tokenPayload.user.usuario});
    this.emailFormGroup.setValue({email: this.tokenPayload.user.email});
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

  handleImagenSubida(imagen: User | null) {
    this.imgFormGroup.setValue({img: imagen?.img});
  }

  completeFirstLogin() {
    this.userFinal = {
      clave: this.claveFormGroup.value.clave || null,
      email: this.emailFormGroup.value.email || null,
      usuario: this.tokenPayload.user.usuario,
      img: this.imgFormGroup.value.img || null,
      nuevoUsuario: this.usuarioFormGroup.value.usuario || null
    }
    this.store.dispatch(FIRST_LOGIN({ user: this.userFinal }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((data) => {
      if (data.apiStatus === "success" && data.firstLoginStatus === "set") {
        this.appStore.dispatch(setAPIStatus({
          apiStatus: {
            apiCodeStatus: 200,
            apiResponseMessage: '',
            apiStatus: '',
            firstLoginStatus: "setted"
          }}))
        this.toastr.success("Primer inicio de sesión en el sistema nuevo completado con éxito.", "Primer Login", {
          progressBar: true
        })
        this.userFinal = {
          usuario: this.usuarioFormGroup.value.usuario,
          clave: this.claveFormGroup.value.clave,
          noNewPass: !this.claveFormGroup.value.clave? true : false,
        }
        this.store.dispatch(LOGIN({ user: this.userFinal }));
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
                let saveToken = localStorage.getItem("auth_token");
                let tokenPayload: any = saveToken? jwtDecode(saveToken) : "";
                if (tokenPayload.user.firstLogin === true) {
                  this.router.navigate(['admin/profile/first-login']);
                } else if (tokenPayload.user.tipoUsuario === "Beneficiario") {
                  this.adminService.obtenerContratos().subscribe(async (contratos: string) => {
                    localStorage.setItem('contratos_afiliado', JSON.stringify(contratos));
                  });
                  this.router.navigate(['admin/dashboard/afiliado-beneficiarios']);
                } else if (tokenPayload.user.tipoUsuario === "AfiliadoTitular") {
                  this.adminService.obtenerContratos().subscribe(async (contratos: string) => {
                    localStorage.setItem('contratos_afiliado', JSON.stringify(contratos));
                  });
                  this.router.navigate(['admin/dashboard/afiliado-titular']);
                } else if (tokenPayload.user.tipoUsuario === "Broker") {
                  this.router.navigate(['admin/dashboard/brokers']);
                } else if (this.adminService.tieneRol()) {
                  this.router.navigate(['admin/dashboard/resumen']);
                } else {
                  this.router.navigate(['admin/dashboard/sinrol']);
                }
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
}
