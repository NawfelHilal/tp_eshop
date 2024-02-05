import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // products: Product[] = [
  //   new Product(
  //     1,
  //     'Bmw',
  //     'M3',
  //     80000,
  //     'https://cdn.automobile-propre.com/uploads/2023/09/BMW-M3.jpg',
  //     'BMW M3 COMPETITION BERLINE. · Moteur essence hautes performances 6 cylindres en ligne M TwinPower Turbo développant une puissance de 510 ch · Boîte de vitesses ...',
  //     0,
  //     'Like',
  //     new Date(),
  //     false,
  //     ['Noir', 'Blanc', 'Rouge', 'Gris']
  //   ),
  //   new Product(
  //     2,
  //     'Mercedes',
  //     'CLA45s',
  //     65599,
  //     'https://www.challenges.fr/assets/img/2019/07/03/cover-r4x3w1000-5d1cd7595a21e-19c0442-058-resultat-jpg.jpg',
  //     'BMW M3 COMPETITION BERLINE. · Moteur essence hautes performances 6 cylindres en ligne M TwinPower Turbo développant une puissance de 510 ch · Boîte de vitesses ...',
  //     0,
  //     'Like',
  //     new Date('2022/12/15'),
  //     true,
  //     ['Noir', 'Blanc', 'Rouge', 'Gris']
  //   ),
  //   new Product(
  //     3,
  //     'AUDI',
  //     'RS6',
  //     88000,
  //     'https://www.reezocar.com/raw/autoscout24.it/RZCATSIT54FDBC3F36AE/AUDI-RS6-00.webp',
  //     'BMW M3 COMPETITION BERLINE. · Moteur essence hautes performances 6 cylindres en ligne M TwinPower Turbo développant une puissance de 510 ch · Boîte de vitesses ...',
  //     0,
  //     'Like',
  //     new Date('2023/10/05'),
  //     false,
  //     ['Noir', 'Blanc', 'Rouge', 'Gris']
  //   ),
  //   new Product(
  //     4,
  //     'Mercedes',
  //     'Classe G63',
  //     180000,
  //     'https://res.cloudinary.com/dsxfn6o4q/image/upload/c_fill,g_center,h_467,w_624/v1636983788/wkxrrd0gfnmnfw3n5tpm.jpg',
  //     'BMW M3 COMPETITION BERLINE. · Moteur essence hautes performances 6 cylindres en ligne M TwinPower Turbo développant une puissance de 510 ch · Boîte de vitesses ...',
  //     0,
  //     'Like',
  //     new Date('2023/10/05'),
  //     false,
  //     ['Noir', 'Blanc', 'Rouge', 'Gris']
  //   ),
  //   new Product(
  //     5,
  //     'Ford',
  //     'Mustang',
  //     60000,
  //     'https://www.largus.fr/images/images/2018-ford-mustang-1.jpg?width=612&quality=80',
  //     'BMW M3 COMPETITION BERLINE. · Moteur essence hautes performances 6 cylindres en ligne M TwinPower Turbo développant une puissance de 510 ch · Boîte de vitesses ...',
  //     0,
  //     'Like',
  //     new Date('2023/10/05'),
  //     false,
  //     ['Noir', 'Blanc', 'Rouge', 'Gris']
  //   ),
  //   new Product(
  //     6,
  //     'Renault',
  //     'Megane 4 RS',
  //     75000,
  //     'https://res.cloudinary.com/dsxfn6o4q/image/upload/c_fill,g_center,h_467,w_624/v1630439206/w8ty0l9aapdd4wb4hqi9.jpg',
  //     'BMW M3 COMPETITION BERLINE. · Moteur essence hautes performances 6 cylindres en ligne M TwinPower Turbo développant une puissance de 510 ch · Boîte de vitesses ...',
  //     0,
  //     'Like',
  //     new Date('2023/10/05'),
  //     false,
  //     ['Noir', 'Blanc', 'Rouge', 'Gris']
  //   ),
  // ];
  // constructor() {}

  // getAllProducts() {
  //   return this.products;
  // }

  // getOneProduct(id: number): Product {
  //   const product = this.products.find((p) => p.id === id);

  //   if (!product) {
  //     throw new Error(`Aucun produit trouvé avec l'ID ${id}`);
  //   }

  //   return product;
  // }

  private apiUrl = 'http://localhost:8000/products';
  products: any;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getOneProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  onLikeProduct(product: Product) {
    if (product.likes === 0) {
      product.btnValue = 'Unlike';

      product.likes++;
    } else {
      product.btnValue = 'Like';
      product.likes--;
    }
  }
}
