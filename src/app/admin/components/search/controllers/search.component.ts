import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: '../views/search.component.html',
  styleUrls: ['../styles/search.component.scss']
})
export class SearchComponent {
  searchTerm: string = '';

  currentDate = Date.now();

  onSearch(): void {
    // Aquí puedes implementar la lógica de búsqueda con el término ingresado
    console.log('Realizando búsqueda:', this.searchTerm);
  }

  clearSearchTerm(): void {
    this.searchTerm = '';
  }
}
