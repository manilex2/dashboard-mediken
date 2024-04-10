import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AdminService } from './admin/services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard-mediken';
  token = localStorage.getItem("auth_token");

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit() {
    document.body.classList.add("mat-typography", "mat-app-background");
    if (this.token) {
      let tokenPayload: any = this.token? jwtDecode(this.token) : "";
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
  }
}
