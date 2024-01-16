import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  template: `
    <app-product-card [myProduct]="myProduct" [orientation]="orientation" />
    <button (click)="addToCart(myProduct)">Add to Cart</button>
  `,
  styles: ``,
  imports: [ProductCardComponent],
})
export class ProductDetailComponent implements OnInit {
  myProduct!: Product;
  id: string = '';
  orientation!: string;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (!productId) {
      this.router.navigate(['/404']);
      return;
    }

    this.id = productId;

    try {
      this.myProduct = this.productService.getOneProduct(parseInt(this.id));
    } catch (error) {
      console.error(error);
      this.router.navigate(['/404']);
    }
  }

  onLike() {
    this.productService.onLikeProduct(this.myProduct);
  }

  addToCart(product: Product) {
    let panier = localStorage.getItem('panier');
    let onP: { id: number; quantity: number }[] = panier
      ? JSON.parse(panier)
      : [];

    let productInCart = onP.find((p) => p.id === product.id);

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      onP.push({ id: product.id, quantity: 1 });
    }

    localStorage.setItem('panier', JSON.stringify(onP));
    console.log('ajouter au panier');
  }
}
