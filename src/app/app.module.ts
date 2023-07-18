/**************** NG MODULES **********************/
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

/**************** PLATFORM BROWSER **********************/
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**************** COMMONS **********************/
import myLocaleES from '@angular/common/locales/es-EC';
import { registerLocaleData } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';

/**************** TOASTR **********************/
import { ToastrModule } from 'ngx-toastr';

/**************** NGRX **********************/
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './shared/store/reducers/app.reducers';

/**************** FECHA **********************/
import { MomentModule } from 'ngx-moment';

/**************** APP MODULES **********************/
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from '../material.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

/**************** ENVIRONMENTS **********************/
import { environment } from 'src/environments/environment';

registerLocaleData(myLocaleES);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      maxOpened: 1,
    }),
    MaterialModule,
    AuthModule,
    StoreModule.forRoot({ appState: appReducer }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    BrowserAnimationsModule,
    MomentModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
