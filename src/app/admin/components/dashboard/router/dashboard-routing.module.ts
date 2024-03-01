import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../controllers/dashboard.component';
import { ResumenComponent } from '../controllers/resumen.component';
import { BrokersComponent } from '../controllers/brokers.component';
import { BrokersMedikenComponent } from '../controllers/brokers-mediken.component';
import { ReembolsosComponent } from '../controllers/reembolsos.component';
import { SinrolComponent } from '../controllers/sinrol.component';
import { BeneficiarioComponent } from '../controllers/beneficiario.component';
import { AdminService } from 'src/app/admin/services/admin.service';
import { AfiliadoTitularComponent } from '../controllers/afiliado-titular.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'resumen', pathMatch: 'full' },
      { path: '', component: DashboardComponent, children: [
        { path: 'resumen', component: ResumenComponent, canActivate: [() => inject(AdminService).esMediken(), () => inject(AdminService).tieneRol()] },
        // { path: 'convenios', component: ConveniosComponent, canActivate: [() => inject(AdminService).esMediken(), () => inject(AdminService).tieneRol()] },
        // { path: 'cobranzas', component: CobranzasComponent, canActivate: [() => inject(AdminService).esMediken(), () => inject(AdminService).tieneRol()] },
        // { path: 'kpis', component: KpisComponent, canActivate: [() => inject(AdminService).esMediken(), () => inject(AdminService).tieneRol()] },
        { path: 'brokers', component: BrokersComponent, canActivate: [() => inject(AdminService).esBroker()] },
        { path: 'brokers-mediken', component: BrokersMedikenComponent, canActivate: [() => inject(AdminService).esMediken(), () => inject(AdminService).tieneRol()] },
        { path: 'reembolsos', component: ReembolsosComponent, canActivate: [() => inject(AdminService).esMediken(), () => inject(AdminService).tieneRol()]},
        { path: 'afiliadoTitular', component: AfiliadoTitularComponent, canActivate: [() => inject(AdminService).esAfiliadoTitular()] },
        { path: 'beneficiario', component: BeneficiarioComponent, canActivate: [() => inject(AdminService).esAfiliadoTitular()? true : () => inject(AdminService).esBeneficiario()] },
        { path: 'sinrol', component: SinrolComponent, canActivate: [() => !inject(AdminService).tieneRol()] },
      ]}
    ]
  },
  {
    path: "**", redirectTo: "dashboard"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
