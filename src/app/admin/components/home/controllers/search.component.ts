import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthService } from 'src/app/auth/services/auth.service';
import { selectAppState } from 'src/app/shared/store/selectors/app.selectors';
import { setAPIStatus } from 'src/app/shared/store/actions/app.actions';
import { currentUser } from 'src/app/admin/store/selectors/currentuser.selectors';
import { GET_CURRENT_USER } from 'src/app/admin/store/actions/currentuser.actions';
import { Appstate } from 'src/app/shared/store/AppState';
import { AdminService } from 'src/app/admin/services/admin.service';
import { LOGOUT } from 'src/app/auth/store/actions/login.actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PROFILE_IMG } from '../../profile/store/actions/profile-image.actions';
import { jwtDecode } from 'jwt-decode';
import { profileImage } from '../../profile/store/selectors/profile-image.selectors';
import { ProfileImg } from '../../profile/models';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: '../views/search.component.html',
  styleUrls: ['../styles/search.component.scss']
})
export class SearchComponent implements OnInit {
  destroy$ = new Subject<void>();
  constructor(
    private authService: AuthService,
    private store: Store,
    private appStore: Store<Appstate>,
    private adminService: AdminService,
    private toastr: ToastrService,
    private router: Router,
    public jwtHelper: JwtHelperService,
  ) {}
  menu: any;
  searchTerm: string = '';
  user: any;
  currentUser: any;
  tokenExpDate: any;
  fechaActual: any;
  preventDate: any;
  token: any;
  loginInterval: any;
  profileImg: ProfileImg | null = null;
  imgSrc: string | null = null;

  currentDate = Date.now();

  onSearch(): void {
    // Aquí puedes implementar la lógica de búsqueda con el término ingresado
    console.log('Realizando búsqueda:', this.searchTerm);
  }

  clearSearchTerm(): void {
    this.searchTerm = '';
  }

  getCurrentUser() {
    this.store.pipe(select(currentUser)).subscribe(current => {
      this.store.dispatch(GET_CURRENT_USER());
      this.currentUser = current;
      let apiStatus$ = this.appStore.pipe(select(selectAppState));
      apiStatus$.subscribe((data) => {
        if (data.apiStatus === "success" && data.userState === "getted" && data.loginStatus === "logged") {
          this.appStore.dispatch(setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '', apiCodeStatus: 200, userState: "done" } }));
        }
      });
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('auth_token');
    let tokenPayload: any = jwtDecode(this.token);
    this.user = this.adminService.getUser();
    if (!this.authService.isAuthenticated()) {
      this.logout();
    }
    this.getCurrentUser();
    this.tokenExpDate = this.jwtHelper.getTokenExpirationDate(this.token);
    this.tokenExpDate = DateTime.fromJSDate(this.tokenExpDate);
    this.loginInterval = setInterval(() => {
      this.fechaActual = DateTime.now();
      if (this.tokenExpDate.diff(this.fechaActual, 'seconds') == 60) {
        this.toastr.info(`Estimado usuario su sesión se cerrará en 1 minuto por seguridad, por favor guarde su trabajo y vuelva a iniciar sesión en caso de necesitarlo.`, "Login", {
          progressBar: true,
          timeOut: 60000,
          positionClass: "toast-top-center",
        })
      }
      if (!this.authService.isAuthenticated()) {
        this.logout();
      }
    }, 1000)
    this.store.dispatch(PROFILE_IMG({ user: {usuario: tokenPayload.user.usuario} }));
    this.store.pipe(select(profileImage), takeUntil(this.destroy$)).subscribe(img => {
      if (img) {
        this.profileImg = img;
        this.imgSrc = this.profileImg.img? `data:image/png;base64,${this.profileImg.img}` : null;
      }
      let apiStatus$ = this.appStore.pipe(select(selectAppState)); 
      apiStatus$.subscribe((data) => {
        if (data.apiStatus === "success" && data.profileImageStatus === "get") {
          this.appStore.dispatch(setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '', apiCodeStatus: 200, profileImageStatus: "getted" } }));
        }
      });
    });
  }

  editarPerfil() {
    this.router.navigate(["admin/profile/edit-profile"]);
  }

  logout() {
    this.store.dispatch(LOGOUT());
    clearInterval(this.loginInterval);
    this.toastr.info("Cerrada la sesión, Hasta pronto.", "Login", {
      progressBar: true,
      timeOut: 3000,
      positionClass: "toast-top-center"
    })
  }

  ngOnDestroy() {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }
}
