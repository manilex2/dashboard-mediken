import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Store } from '@ngrx/store';
import { LOGOUT } from '../../../../auth/store/actions/login.actions';

@Component({
  selector: 'app-menu',
  templateUrl: '../views/menu.component.html',
  styleUrls: ['../styles/menu.component.scss']
})
export class MenuComponent implements OnInit {
  mediken!: boolean;
  beneficiario!: boolean;
  broker!: boolean;
  rolMediken: any;

  constructor(
    private adminService: AdminService,
    private store: Store,
  ) { }

  ngOnInit(): void {
      this.mediken = this.adminService.esMediken();
      this.beneficiario = this.adminService.esBeneficiario();
      this.broker = this.adminService.esBroker();
      this.rolMediken = this.adminService.rolMediken();

  }

  logout() {
    this.store.dispatch(LOGOUT());
  }
}
