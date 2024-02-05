import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { AppPipesModule } from '../pipes/app-pipes.module';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: true,
  template: `
    <div class="searchdiv">
      <input
        class="search"
        type="text"
        [(ngModel)]="searchTerm"
        placeholder="Rechercher un produit"
      />
    </div>
    <div class="divBtn">
      <button mat-button color="primary" (click)="toggleSorting()">
        Trier par Date {{ sortTri }}
      </button>
      <button mat-button color="primary" (click)="nameSorting()">
        Trier par Nom {{ sortTri }}
      </button>
    </div>
    <div class="product-container">
      <app-product-card
        class="listCard"
        *ngFor="
          let product of products
            | sortByDate : sortTri
            | search : searchTerm
            | sortByName : nameSort
        "
        [myProduct]="product"
        (click)="navigateToProduct(product.id)"
      />
    </div>
  `,
  styleUrls: ['./products-list.component.css'],
  imports: [
    ProductCardComponent,
    AppPipesModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
  ],
})
export class ProductsListComponent implements OnInit {
  searchTerm: string = '';
  products!: Product[];
  sortTri: string = 'asc';
  search: string = '';
  nameSort: string = 'asc';

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const favoriteProducts = JSON.parse(
      localStorage.getItem('favoriteProducts') || '[]'
    );

    this.products = this.productService.products.map((product: Product) => {
      product.isFavorite = favoriteProducts.some(
        (p: Product) => p.modele === product.modele
      );
      return product;
    });

    console.log(this.products);
  }

  toggleSorting() {
    this.sortTri = this.sortTri === 'asc' ? 'desc' : 'asc';
  }

  nameSorting() {
    this.nameSort = this.nameSort === 'asc' ? 'desc' : 'asc';
  }

  navigateToProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
