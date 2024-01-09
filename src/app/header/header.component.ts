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
      <span>Auto Sale</span>
      <ul>
        <li>
          <a routerLink="" routerLinkActive="router-link-active"> Accueil </a>
        </li>

        <li>
          <a routerLink="cart" routerLinkActive="router-link-active"> Cart </a>
        </li>
      </ul>
    </mat-toolbar>
  `,
  styles: ``,
})
export class HeaderComponent {}
