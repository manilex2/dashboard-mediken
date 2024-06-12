import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, QueryParamsHandling, Router } from '@angular/router';
import { EncryptionService } from 'src/app/admin/services/encryption.service';

@Component({
  selector: 'app-mediken',
  standalone: false,
  templateUrl: '../views/mediken.component.html',
  styleUrl: '../styles/mediken.component.scss'
})
export class MedikenComponent implements OnInit {
  constructor(
    private encryptionService: EncryptionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  url = "";

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; };
    this.activatedRoute.queryParamMap.subscribe((parametros: ParamMap) => {
      this.url = parametros.get("web")!;
    })
  }
}
