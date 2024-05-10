import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-mediken',
  standalone: false,
  templateUrl: '../views/mediken.component.html',
  styleUrl: '../styles/mediken.component.scss'
})
export class MedikenComponent implements OnInit {
  web: any = '';
  token: any = '';
  contratos: any = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => { return false; };
    this.token = localStorage.getItem('auth_token');
    this.contratos = localStorage.getItem('contratos_afiliado');
    this.contratos = JSON.parse(this.contratos);
    let tokenPayload: any = jwtDecode(this.token);
    this.web = `${this.activatedRoute.snapshot.queryParams['web']}?nombre=${tokenPayload.user.nombres.trim()} ${tokenPayload.user.apellidos.trim()}&contrato=${this.contratos[0].contrato}&secuencial=${this.contratos[0].secuencial}&cedula=${tokenPayload.user.identificacion.trim()}`;
  } 
}
