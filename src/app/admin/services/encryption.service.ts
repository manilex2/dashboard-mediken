import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  /* private secretKey = 'e458f439-0ea5-40b4-95dc-0865612c5327';
  
  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.secretKey).toString();
  } */

  /* decrypt(value: string): string {
    const bytes = CryptoJS.AES.decrypt(value, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } */

  encrypt(value: string): string {
    const cod = CryptoJS.enc.Utf8.parse(value);
    return CryptoJS.enc.Hex.stringify(cod);
  }

  decrypt(value: string): string {
    const decodedData = CryptoJS.enc.Hex.parse(value);
    return CryptoJS.enc.Utf8.stringify(decodedData);
  }
}
