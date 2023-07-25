/* MODULOS */
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './router/admin-routing.module';
import { FormsModule } from '@angular/forms';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { NgxSpinnerModule } from 'ngx-spinner';

/* INTERCEPTORES */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PowerBIInterceptor } from './services/powerbi.interceptor';

/* NGRX */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCurrentUser from './store/reducers/currentuser.reducers';

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
import { BrokersMedikenComponent } from './components/brokers-mediken/controllers/brokers-mediken.component';
import { ReembolsosComponent } from './components/reembolsos/controllers/reembolsos.component';
import { BeneficiarioComponent } from './components/beneficiario/controllers/beneficiario.component';
import { CurrentUserEffect } from './store/effects/currentuser.effects';

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
    BrokersMedikenComponent,
    ReembolsosComponent,
    BeneficiarioComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    PowerBIEmbedModule,
    NgxSpinnerModule,
    StoreModule.forFeature(fromCurrentUser.currentUserFeatureKey, fromCurrentUser.currentUserReducer),
    EffectsModule.forFeature([CurrentUserEffect]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: PowerBIInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule { }
