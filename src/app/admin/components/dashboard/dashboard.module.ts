/* MODULOS */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './router/dashboard-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { MaterialModule } from '../../../../material.module';
import { HomeModule } from '../home/home.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* INTERCEPTORES */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PowerBIInterceptor } from '../../services/powerbi.interceptor';

/* COMPONENTES */
import { AfiliadoTitularComponent } from './controllers/afiliado-titular.component';
import { BeneficiarioComponent } from './controllers/beneficiario.component';
import { BrokersMedikenComponent } from './controllers/brokers-mediken.component';
import { BrokersComponent } from './controllers/brokers.component';
import { CobranzasComponent } from './controllers/cobranzas.component';
import { ConveniosComponent } from './controllers/convenios.component';
import { DashboardComponent } from './controllers/dashboard.component';
import { KpisComponent } from './controllers/kpis.component';
import { ReembolsosComponent } from './controllers/reembolsos.component';
import { ResumenComponent } from './controllers/resumen.component';
import { SinrolComponent } from './controllers/sinrol.component';
import { AfiliadoBeneficiariosComponent } from './controllers/afiliado-beneficiarios.component';
import { ChangePasswordDialogComponent } from './controllers/change-password-dialog.component';
import { MedikenComponent } from './controllers/mediken.component';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    AfiliadoTitularComponent,
    BeneficiarioComponent,
    BrokersMedikenComponent,
    BrokersComponent,
    CobranzasComponent,
    ConveniosComponent,
    DashboardComponent,
    KpisComponent,
    ReembolsosComponent,
    ResumenComponent,
    SinrolComponent,
    AfiliadoBeneficiariosComponent,
    ChangePasswordDialogComponent,
    MedikenComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PowerBIEmbedModule,
    NgxSpinnerModule,
    MaterialModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: PowerBIInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule { }
