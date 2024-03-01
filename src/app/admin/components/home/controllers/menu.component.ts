import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Store } from '@ngrx/store';
import { LOGOUT } from '../../../../auth/store/actions/login.actions';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import moment from 'moment';

@Component({
  selector: 'app-menu',
  templateUrl: '../views/menu.component.html',
  styleUrls: ['../styles/menu.component.scss']
})
export class MenuComponent implements OnInit {
  mediken!: boolean;
  beneficiario!: boolean;
  broker!: boolean;
  afiliadoTitular!: boolean;
  rolMediken: any;
  loginInterval: any;
  tokenExpDate: any;
  fechaActual: any;
  preventDate: any;
  token: any;

  constructor(
    private adminService: AdminService,
    private store: Store,
    private toastr: ToastrService,
    private authService: AuthService,
    public jwtHelper: JwtHelperService,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('auth_token');
    this.mediken = this.adminService.esMediken();
    this.beneficiario = this.adminService.esBeneficiario();
    this.broker = this.adminService.esBroker();
    this.afiliadoTitular = this.adminService.esAfiliadoTitular();
    this.rolMediken = this.adminService.rolMediken();
    this.tokenExpDate = this.jwtHelper.getTokenExpirationDate(this.token);
    this.loginInterval = setInterval(() => {
      this.tokenExpDate = moment(this.jwtHelper.getTokenExpirationDate(this.token));
      this.fechaActual = moment(new Date());
      if (this.tokenExpDate.diff(this.fechaActual, 'seconds') == 60) {
        this.toastr.info(`Estimado usuario su sesión se cerrará en 1 minuto por seguridad, por favor guarde su trabajo y vuelva a iniciar sesión en caso de necesitarlo.`, "Login", {
          progressBar: true,
          timeOut: 60000,
          positionClass: "toast-top-center",
        })
      }
      if (!this.authService.isAuthenticated()) {
        this.logout();
      }
    }, 1000)
  }

  logout() {
    this.store.dispatch(LOGOUT());
    clearInterval(this.loginInterval);
    this.toastr.info("Cerrada la sesión, Hasta pronto.", "Login", {
      progressBar: true,
      timeOut: 3000,
      positionClass: "toast-top-center"
    })
  }
}
