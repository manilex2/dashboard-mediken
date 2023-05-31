/* MODULOS */
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminRoutingModule } from './router/admin-routing.module';
import { FormsModule } from '@angular/forms';

/* COMPONENTES */
import { MenuComponent } from './components/menu/controllers/menu.component';
import { DashboardComponent } from './components/dashboard/controllers/dashboard.component';
import { MaterialModule } from 'src/material.module';
import { SearchComponent } from './components/search/controllers/search.component';
import { ResumenComponent } from './components/resumen/controllers/resumen.component';
import { ConveniosComponent } from './components/convenios/controllers/convenios.component';
import { CobranzasComponent } from './components/cobranzas/controllers/cobranzas.component';
import { KpisComponent } from './components/kpis/controllers/kpis.component';
import { BrokersComponent } from './components/brokers/controllers/brokers.component';
import { ReembolsosComponent } from './components/reembolsos/controllers/reembolsos.component';

@NgModule({
  declarations: [
    MenuComponent,
    DashboardComponent,
    SearchComponent,
    ResumenComponent,
    ConveniosComponent,
    CobranzasComponent,
    KpisComponent,
    BrokersComponent,
    ReembolsosComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class AdminModule { }
