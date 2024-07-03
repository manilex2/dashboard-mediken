import { Component, Input, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { EncryptionService } from 'src/app/admin/services/encryption.service';

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

  constructor(private encryptionService: EncryptionService) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('auth_token');
    this.contratos = localStorage.getItem('contratos_afiliado');
    this.contratos = JSON.parse(this.contratos);
    this.tokenPayload = jwtDecode(this.token);
    // nombre - contrato - secuencial - cedula (ROT13)
    this.web = `${this.url}?abzoer=${this.encryptionService.encrypt(this.tokenPayload.user.nombres.trim())}` + ' ' + `${this.tokenPayload.user.apellidos? this.encryptionService.encrypt(this.tokenPayload.user.apellidos.trim()) : ''}&pbagengb=${this.contratos? this.encryptionService.encrypt(this.contratos[0].contrato) : ''}&frphrapvny=${this.contratos? this.encryptionService.encrypt(this.contratos[0].secuencial) : ''}&prqhyn=${this.tokenPayload.user.usuario? this.encryptionService.encrypt(this.tokenPayload.user.usuario.trim()) : ""}`;
  }
}
