import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  template: `
    <app-product-card [myProduct]="myProduct" [orientation]="orientation" />
  `,
  styles: ``,
  imports: [ProductCardComponent],
})
export class ProductDetailComponent implements OnInit {
  myProduct!: Product;
  id!: number;
  orientation!: string;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
    });
  }

  ngOnInit(): void {
    this.myProduct = this.productService.getOneProduct(this.id);
    this.orientation = 'landscape';
  }

  onLike() {
    this.productService.onLikeProduct(this.myProduct);
  }
}
