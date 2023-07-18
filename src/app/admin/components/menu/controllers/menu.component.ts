import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Store, select } from '@ngrx/store';
import { GET_CURRENT_USER } from 'src/app/admin/store/actions/currentuser.actions';
import { Appstate } from 'src/app/shared/store/AppState';
import { ToastrService } from 'ngx-toastr';
import { selectAppState } from 'src/app/shared/store/selectors/app.selectors';
import { setAPIStatus } from 'src/app/shared/store/actions/app.actions';
import { currentUser } from 'src/app/admin/store/selectors/currentuser.selectors';

@Component({
  selector: 'app-menu',
  templateUrl: '../views/menu.component.html',
  styleUrls: ['../styles/menu.component.scss']
})
export class MenuComponent implements OnInit {

  user: any;
  mediken!: boolean;
  beneficiario!: boolean;
  currentUser: any;

  constructor(
    private adminService: AdminService,
    private store: Store,
    private appStore: Store<Appstate>,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
      this.user = this.adminService.getUserName();
      this.mediken = this.adminService.esMediken();
      this.beneficiario = this.adminService.esBeneficiario();
      this.getCurrentUser();
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
}
