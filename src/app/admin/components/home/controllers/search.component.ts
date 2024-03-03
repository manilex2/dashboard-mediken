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

@Component({
  selector: 'app-search',
  templateUrl: '../views/search.component.html',
  styleUrls: ['../styles/search.component.scss']
})
export class SearchComponent implements OnInit {
menu: any;

  constructor(
    private authService: AuthService,
    private store: Store,
    private appStore: Store<Appstate>,
    private adminService: AdminService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  searchTerm: string = '';
  user: any;
  currentUser: any;

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
    this.user = this.adminService.getUser();
    if (!this.authService.isAuthenticated()) {
      this.store.dispatch(LOGOUT());
      this.toastr.info("Cerrada la sesión, Hasta pronto.", "Login", {
        progressBar: true,
        timeOut: 3000,
        positionClass: "toast-top-center"
      })
    }
    this.getCurrentUser();
  }

  editarPerfil() {
    this.router.navigate(["admin/profile/edit-profile"]);
  }
}
