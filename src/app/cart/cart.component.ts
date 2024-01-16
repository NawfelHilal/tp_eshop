import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../models/cartitem.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems: CartItem[] = [];
  products: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    const panier = localStorage.getItem('panier');
    if (panier) {
      this.cartItems = JSON.parse(panier);
    }
    this.loadProductDetails();
  }

  loadProductDetails() {
    this.cartItems.forEach((item) => {
      const product = this.productsService.getOneProduct(item.id);
      if (product) {
        this.products.push(product);
      }
    });
  }
  getProduct(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }
}
