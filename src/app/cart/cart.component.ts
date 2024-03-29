import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../models/cartitem.model';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ContactFormComponent, MatButtonModule],
  providers: [ProductsService, HttpClientModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CartComponent {
  cartItems: CartItem[] = [];
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

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
      this.productsService.getOneProduct(item.id).subscribe((product) => {
        if (product) {
          this.products.push(product);
        }
      });
    });
  }
  getProduct(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  increaseQuantity(cartItem: CartItem) {
    cartItem.quantity++;
    this.updateCart();
  }

  decreaseQuantity(item: CartItem) {
    const index = this.cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (index !== -1) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      } else {
        this.cartItems.splice(index, 1);
      }
      this.updateCart();
    }
  }

  updateCart() {
    localStorage.setItem('panier', JSON.stringify(this.cartItems));
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    this.cartItems.forEach((item) => {
      const product = this.getProduct(item.id);
      if (product) {
        totalPrice += product.prix * item.quantity;
      }
    });
    return totalPrice;
  }

  placeOrder() {
    const orderId = Math.floor(Math.random() * 1000000);
    alert(`Votre numéro de commande est : ${orderId}`);
    this.router.navigate(['/order', orderId]);
  }
}
