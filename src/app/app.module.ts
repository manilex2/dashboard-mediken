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
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './shared/store/reducers/app.reducers';
import { localStorageSync } from 'ngrx-store-localstorage';

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

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['appState', 'changePasswordResetState', 'changePasswordState', 'resetPasswordState', 'currentUserState', 'profileImageState', 'firstLoginState']})(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

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
    StoreModule.forRoot({ appState: appReducer }, {metaReducers}),
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
