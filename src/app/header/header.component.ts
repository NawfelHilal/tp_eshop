import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppPipesModule } from '../pipes/app-pipes.module';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    FormsModule,
    AppPipesModule,
    MatMenuModule,
    RouterLink,
  ],
  template: `
    <mat-toolbar color="primary">
      <div class="toolbar-content">
        <a routerLink="/">Auto Sale</a>
        <div class="toolbar-links">
          <div>
            <a routerLink="" routerLinkActive="router-link-active"> Accueil </a>
          </div>
          <div>
            <a routerLink="cart" routerLinkActive="router-link-active">
              Panier
            </a>
          </div>
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: `
  .toolbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.toolbar-links {
  display: flex;
  gap: 20px;
}
`,
})
export class HeaderComponent {}
