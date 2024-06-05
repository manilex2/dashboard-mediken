import { Component, Input, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-iframe',
  templateUrl: '../views/iframe.component.html',
  styleUrl: '../styles/iframe.component.scss'
})
export class IframeComponent implements OnInit {

  @Input() url: any; 
  web: any = '';
  token: any = '';
  contratos: any = '';
  tokenPayload: any;
  initialContent: string = '';
  iframeDocument!: HTMLHtmlElement
  encriptedURL: any;

  constructor() {}

  ngOnInit(): void {
    this.token = localStorage.getItem('auth_token');
    this.contratos = localStorage.getItem('contratos_afiliado');
    this.contratos = JSON.parse(this.contratos);
    this.tokenPayload = jwtDecode(this.token);
    this.web = `${this.url}?nombre=${this.tokenPayload.user.nombres.trim()} ${this.tokenPayload.user.apellidos? this.tokenPayload.user.apellidos.trim() : ''}&contrato=${this.contratos? this.contratos[0].contrato : ''}&secuencial=${this.contratos? this.contratos[0].secuencial : ''}&cedula=${this.tokenPayload.user.identificacion? this.tokenPayload.user.identificacion.trim() : this.tokenPayload.user.usuario.trim()}`;
  }
}
