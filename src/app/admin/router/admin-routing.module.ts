import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/controllers/dashboard.component';
import { ResumenComponent } from '../components/resumen/controllers/resumen.component';
import { ConveniosComponent } from '../components/convenios/controllers/convenios.component';
import { CobranzasComponent } from '../components/cobranzas/controllers/cobranzas.component';
import { KpisComponent } from '../components/kpis/controllers/kpis.component';
import { BrokersComponent } from '../components/brokers/controllers/brokers.component';
import { BrokersMedikenComponent } from '../components/brokers-mediken/controllers/brokers-mediken.component';
import { ReembolsosComponent } from '../components/reembolsos/controllers/reembolsos.component';
import { BeneficiarioComponent } from '../components/beneficiario/controllers/beneficiario.component';
import { AdminService } from '../services/admin.service';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: "full" },
      { path: 'dashboard', component: DashboardComponent, children: [
        { path: 'resumen', component: ResumenComponent, canActivate: [() => inject(AdminService).esMediken()] },
        { path: 'convenios', component: ConveniosComponent, canActivate: [() => inject(AdminService).esMediken()] },
        { path: 'cobranzas', component: CobranzasComponent, canActivate: [() => inject(AdminService).esMediken()] },
        { path: 'kpis', component: KpisComponent, canActivate: [() => inject(AdminService).esMediken()] },
        { path: 'brokers', component: BrokersComponent, canActivate: [() => inject(AdminService).esBroker()] },
        { path: 'brokers-mediken', component: BrokersMedikenComponent, canActivate: [() => inject(AdminService).esMediken()] },
        { path: 'reembolsos', component: ReembolsosComponent, canActivate: [() => inject(AdminService).esMediken()]},
        { path: 'beneficiario', component: BeneficiarioComponent, canActivate: [() => inject(AdminService).esBeneficiario()] },
      ]}
    ]
  },
  {
    path: "**", redirectTo: "admin"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
