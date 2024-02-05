import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { AppPipesModule } from '../pipes/app-pipes.module';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Route, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

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
      <ng-container *ngIf="products">
        <app-product-card
          *ngFor="
            let product of products
              | sortByDate : sortTri
              | search : searchTerm
              | sortByName : nameSort
          "
          class="listCard"
          [myProduct]="product"
          (click)="navigateToProduct(product.id)"
        >
        </app-product-card>
      </ng-container>
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
  providers: [ProductsService, HttpClientModule],
})
export class ProductsListComponent implements OnInit {
  searchTerm: string = '';
  products!: Product[];
  favoriteProducts: any[] = [];
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

    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
      console.log(this.products);
    });
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
