import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/controllers/dashboard.component';
import { ResumenComponent } from '../components/resumen/controllers/resumen.component';
import { ConveniosComponent } from '../components/convenios/controllers/convenios.component';
import { CobranzasComponent } from '../components/cobranzas/controllers/cobranzas.component';
import { KpisComponent } from '../components/kpis/controllers/kpis.component';
import { BrokersComponent } from '../components/brokers/controllers/brokers.component';
import { ReembolsosComponent } from '../components/reembolsos/controllers/reembolsos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: "full" },
      { path: 'dashboard', component: DashboardComponent, children: [
        { path: 'resumen', component: ResumenComponent },
        { path: 'convenios', component: ConveniosComponent },
        { path: 'cobranzas', component: CobranzasComponent },
        { path: 'kpis', component: KpisComponent },
        { path: 'brokers', component: BrokersComponent },
        { path: 'reembolsos', component: ReembolsosComponent },
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
