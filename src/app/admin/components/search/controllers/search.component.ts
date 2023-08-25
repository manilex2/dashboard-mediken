import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthService } from 'src/app/auth/services/auth.service';
import { selectAppState } from 'src/app/shared/store/selectors/app.selectors';
import { setAPIStatus } from 'src/app/shared/store/actions/app.actions';
import { currentUser } from 'src/app/admin/store/selectors/currentuser.selectors';
import { GET_CURRENT_USER } from 'src/app/admin/store/actions/currentuser.actions';
import { Appstate } from 'src/app/shared/store/AppState';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-search',
  templateUrl: '../views/search.component.html',
  styleUrls: ['../styles/search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private store: Store,
    private appStore: Store<Appstate>,
    private adminService: AdminService,
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
    this.user = this.adminService.getUserName();
    if (!this.authService.isAuthenticated()) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('powerbi_report_token');
    }
    this.getCurrentUser();
  }
}
