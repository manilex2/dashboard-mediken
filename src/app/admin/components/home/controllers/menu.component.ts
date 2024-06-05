import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { jwtDecode } from 'jwt-decode';
import { EncryptionService } from 'src/app/admin/services/encryption.service';

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
  token: any;
  menus: any;

  constructor(
    private adminService: AdminService,
    private encryptionService: EncryptionService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('auth_token');
    this.mediken = this.adminService.esMediken();
    this.beneficiario = this.adminService.esBeneficiario();
    this.broker = this.adminService.esBroker();
    this.afiliadoTitular = this.adminService.esAfiliadoTitular();
    this.rolMediken = this.adminService.rolMediken();
    let tokenPayload: any = jwtDecode(this.token);
    this.menus = tokenPayload.user.menu;
  }

  getEncryptQueryParams(url: string): object {
    return {
      web: `${this.encryptionService.encrypt(url)}`
    };
  }
}
