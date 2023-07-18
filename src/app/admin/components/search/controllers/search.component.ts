import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOGOUT } from '../../../../auth/store/actions/login.actions';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search',
  templateUrl: '../views/search.component.html',
  styleUrls: ['../styles/search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private store: Store
  ) {}

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
    if (!this.authService.isAuthenticated()) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('powerbi_report_token');
    }
  }

  logout() {
    this.store.dispatch(LOGOUT());
  }
}
