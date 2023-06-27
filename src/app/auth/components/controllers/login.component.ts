import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: '../views/login.component.html',
  styleUrls: ['../styles/login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalBroadcastService: MsalBroadcastService,
    private authService: MsalService,
    private router: Router
  ) {

  }

  isUserLoggedIn: boolean = false;
  private readonly _destroy = new Subject<void>();

  ngOnInit(): void {
    this.msalBroadcastService.inProgress$.pipe(
      filter((interactionStatus: InteractionStatus) => interactionStatus == InteractionStatus.None),
      takeUntil(this._destroy)
    ).subscribe(x => {
      this.isUserLoggedIn = this.authService.instance.getAllAccounts().length > 0;
      if (this.isUserLoggedIn) {
        this.router.navigate(['/admin/dashboard/resumen'])
      }
    })
  }

  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
  }

  login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    } else {
      this.authService.loginRedirect()
    }
  }
}
