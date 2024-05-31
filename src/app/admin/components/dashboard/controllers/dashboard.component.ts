import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store, select } from '@ngrx/store';
import { LOGIN, LOGOUT } from 'src/app/auth/store/actions/login.actions';
import { jwtDecode } from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from './change-password-dialog.component';
import { CHANGE_PASSWORD } from 'src/app/auth/store/actions/change-password.actions';
import { Router } from '@angular/router';
import { Appstate } from 'src/app/shared/store/AppState';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/services/admin.service';
import { selectAppState } from 'src/app/shared/store/selectors/app.selectors';
import { setAPIStatus } from 'src/app/shared/store/actions/app.actions';
import { user } from 'src/app/auth/store/selectors/login.selectors';
import { DateTime } from "luxon";

@Component({
  selector: 'app-dashboard',
  templateUrl: '../views/dashboard.component.html',
  styleUrls: ['../styles/dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  isSmallScreen = false;
  opened = true;
  token = localStorage.getItem("auth_token");

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    public dialog: MatDialog,
    private appStore: Store<Appstate>,
    private toastr: ToastrService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    if(!this.token) {
      this.store.dispatch(LOGOUT());
    }
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
        if (this.isSmallScreen) {
          this.opened = false;
        } else {
          this.opened = true;
        }
      });
    let tokenPayload: any = this.token? jwtDecode(this.token) : "";
    if (!tokenPayload.user.notifChangePass1) {
      const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
        data: {user: tokenPayload.user, notification: 1},
        closeOnNavigation: false,
        disableClose: true,
        enterAnimationDuration: 2000,
        exitAnimationDuration: 1000
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.clave) {
            this.store.dispatch(CHANGE_PASSWORD({ user: result }));
            let apiStatus$ = this.appStore.pipe(select(selectAppState));
            apiStatus$.subscribe((data) => {
              if (data.apiStatus === "success" && data.changePasswordStatus === "change") {
                this.appStore.dispatch(setAPIStatus({
                  apiStatus: {
                    apiCodeStatus: 200,
                    apiResponseMessage: '',
                    apiStatus: '',
                    changePasswordStatus: "changed"
                  }}))
                this.toastr.success("Contraseña cambiada con exito.", "Contraseña Cambiada", {
                  progressBar: true
                })
                this.store.dispatch(LOGIN({ user: result }));
                let apiStatus$ = this.appStore.pipe(select(selectAppState));
                apiStatus$.subscribe((data) => {
                  if (data.apiStatus === "success" && data.loginStatus === "login") {
                    this.appStore.dispatch(setAPIStatus({
                      apiStatus: {
                        apiCodeStatus: 200,
                        apiResponseMessage: '',
                        apiStatus: '',
                        loginStatus: "logged"
                      }}));
                    this.store.pipe(select(user)).subscribe((data => {
                      for (let i = 0; i < data.length; i++) {
                        const token = data[i].token;
                        localStorage.setItem('auth_token', token);
                      }
                    }))
                  } else if (data.apiStatus === "error" && data.loginStatus === "logout") {
                    this.appStore.dispatch(setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '', apiCodeStatus: 200 } }));
                    this.toastr.error(data.apiResponseMessage, "Login", {
                      progressBar: true
                    })
                  }
                })
              } else if (data.apiStatus === "error" && data.changePasswordStatus === "") {
                this.appStore.dispatch(setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '', apiCodeStatus: 200 } }));
                this.toastr.error(data.apiResponseMessage, "Cambiar Contraseña", {
                  progressBar: true
                })
              }
            })
        } else {
          this.adminService.updatePassNotif(result).subscribe(res => {
            this.store.dispatch(LOGIN({ user: result }));
            let apiStatus$ = this.appStore.pipe(select(selectAppState));
            apiStatus$.subscribe((data) => {
              if (data.apiStatus === "success" && data.loginStatus === "login") {
                this.appStore.dispatch(setAPIStatus({
                  apiStatus: {
                    apiCodeStatus: 200,
                    apiResponseMessage: '',
                    apiStatus: '',
                    loginStatus: "logged"
                  }}));
                this.store.pipe(select(user)).subscribe((data => {
                  for (let i = 0; i < data.length; i++) {
                    const token = data[i].token;
                    localStorage.setItem('auth_token', token);
                  }
                }))
              } else if (data.apiStatus === "error" && data.loginStatus === "logout") {
                this.appStore.dispatch(setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '', apiCodeStatus: 200 } }));
                this.toastr.error(data.apiResponseMessage, "Login", {
                  progressBar: true
                })
              }
            })
          })
        }
      });
    } else if(!tokenPayload.user.notifChangePass2 && (DateTime.now() >= DateTime.fromISO(tokenPayload.user.notifChangePassDate2))) {
      const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
        data: {user: tokenPayload.user, notification: 2},
        closeOnNavigation: false,
        disableClose: true,
        enterAnimationDuration: 2000,
        exitAnimationDuration: 1000
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.clave) {
          this.store.dispatch(CHANGE_PASSWORD({ user: result }));
          let apiStatus$ = this.appStore.pipe(select(selectAppState));
          apiStatus$.subscribe((data) => {
            if (data.apiStatus === "success" && data.changePasswordStatus === "change") {
              this.appStore.dispatch(setAPIStatus({
                apiStatus: {
                  apiCodeStatus: 200,
                  apiResponseMessage: '',
                  apiStatus: '',
                  changePasswordStatus: "changed"
                }}))
              this.toastr.success("Contraseña cambiada con exito.", "Contraseña Cambiada", {
                progressBar: true
              })
              this.store.dispatch(LOGIN({ user: result }));
              let apiStatus$ = this.appStore.pipe(select(selectAppState));
              apiStatus$.subscribe((data) => {
                if (data.apiStatus === "success" && data.loginStatus === "login") {
                  this.appStore.dispatch(setAPIStatus({
                    apiStatus: {
                      apiCodeStatus: 200,
                      apiResponseMessage: '',
                      apiStatus: '',
                      loginStatus: "logged"
                    }}));
                  this.store.pipe(select(user)).subscribe((data => {
                    for (let i = 0; i < data.length; i++) {
                      const token = data[i].token;
                      localStorage.setItem('auth_token', token);
                    }
                  }))
                } else if (data.apiStatus === "error" && data.loginStatus === "logout") {
                  this.appStore.dispatch(setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '', apiCodeStatus: 200 } }));
                  this.toastr.error(data.apiResponseMessage, "Login", {
                    progressBar: true
                  })
                }
              })
            } else if (data.apiStatus === "error" && data.changePasswordStatus === "") {
              this.appStore.dispatch(setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '', apiCodeStatus: 200 } }));
              this.toastr.error(data.apiResponseMessage, "Cambiar Contraseña", {
                progressBar: true
              })
            }
          })
        } else {
          this.adminService.updatePassNotif(result).subscribe(res => {
            this.store.dispatch(LOGIN({ user: result }));
            let apiStatus$ = this.appStore.pipe(select(selectAppState));
            apiStatus$.subscribe((data) => {
              if (data.apiStatus === "success" && data.loginStatus === "login") {
                this.appStore.dispatch(setAPIStatus({
                  apiStatus: {
                    apiCodeStatus: 200,
                    apiResponseMessage: '',
                    apiStatus: '',
                    loginStatus: "logged"
                  }}));
                this.store.pipe(select(user)).subscribe((data => {
                  for (let i = 0; i < data.length; i++) {
                    const token = data[i].token;
                    localStorage.setItem('auth_token', token);
                  }
                }))
              } else if (data.apiStatus === "error" && data.loginStatus === "logout") {
                this.appStore.dispatch(setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '', apiCodeStatus: 200 } }));
                this.toastr.error(data.apiResponseMessage, "Login", {
                  progressBar: true
                })
              }
            })
          })
        }
      });
    } else if(!tokenPayload.user.notifChangePass3 && (DateTime.now() >= DateTime.fromISO(tokenPayload.user.notifChangePassDate3))) {
      const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
        data: {user: tokenPayload.user, notification: 3},
        closeOnNavigation: false,
        disableClose: true,
        enterAnimationDuration: 2000,
        exitAnimationDuration: 1000
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.clave) {
          this.store.dispatch(CHANGE_PASSWORD({ user: result }));
          let apiStatus$ = this.appStore.pipe(select(selectAppState));
          apiStatus$.subscribe((data) => {
            if (data.apiStatus === "success" && data.changePasswordStatus === "change") {
              this.appStore.dispatch(setAPIStatus({
                apiStatus: {
                  apiCodeStatus: 200,
                  apiResponseMessage: '',
                  apiStatus: '',
                  changePasswordStatus: "changed"
                }}))
              this.toastr.success("Contraseña cambiada con exito.", "Contraseña Cambiada", {
                progressBar: true
              })
              this.store.dispatch(LOGIN({ user: result }));
              let apiStatus$ = this.appStore.pipe(select(selectAppState));
              apiStatus$.subscribe((data) => {
                if (data.apiStatus === "success" && data.loginStatus === "login") {
                  this.appStore.dispatch(setAPIStatus({
                    apiStatus: {
                      apiCodeStatus: 200,
                      apiResponseMessage: '',
                      apiStatus: '',
                      loginStatus: "logged"
                    }}));
                  this.store.pipe(select(user)).subscribe((data => {
                    for (let i = 0; i < data.length; i++) {
                      const token = data[i].token;
                      localStorage.setItem('auth_token', token);
                    }
                  }))
                } else if (data.apiStatus === "error" && data.loginStatus === "logout") {
                  this.appStore.dispatch(setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '', apiCodeStatus: 200 } }));
                  this.toastr.error(data.apiResponseMessage, "Login", {
                    progressBar: true
                  })
                }
              })
            } else if (data.apiStatus === "error" && data.changePasswordStatus === "") {
              this.appStore.dispatch(setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '', apiCodeStatus: 200 } }));
              this.toastr.error(data.apiResponseMessage, "Cambiar Contraseña", {
                progressBar: true
              })
            }
          })
        }
      });
    }
  }
}
