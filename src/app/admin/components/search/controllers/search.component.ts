import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: '../views/search.component.html',
  styleUrls: ['../styles/search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalBroadcastService: MsalBroadcastService,
    private authService: MsalService
  ) {

  }

  isUserLoggedIn: boolean = false;
  private readonly _destroy = new Subject<void>();

  searchTerm: string = '';

  currentDate = Date.now();

  onSearch(): void {
    // Aquí puedes implementar la lógica de búsqueda con el término ingresado
    console.log('Realizando búsqueda:', this.searchTerm);
  }

  clearSearchTerm(): void {
    this.searchTerm = '';
  }

  ngOnInit(): void {
    this.msalBroadcastService.inProgress$.pipe(
      filter((interactionStatus: InteractionStatus) => interactionStatus == InteractionStatus.None),
      takeUntil(this._destroy)
    ).subscribe(x => {
      this.isUserLoggedIn = this.authService.instance.getAllAccounts().length > 0
    })
  }

  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
  }

  logout() {
    this.authService.logoutRedirect({postLogoutRedirectUri: environment.apiConfig.postLogoutUrl});
  }
}
