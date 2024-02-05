import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({ name: 'sortByDate' })
export class SortByDatePipe implements PipeTransform {
  transform(products: Product[], order?: string): Product[] {
    if (!products) {
      return [];
    }
    let desc = order !== 'asc';
    return products.sort((a, b) => {
      if (desc) return new Date(b.date).getTime() - new Date(a.date).getTime();
      else return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }
}

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
  transform(products: Product[], searchTerm: string): Product[] {
    if (!products || !searchTerm) {
      return products;
    }

    searchTerm = searchTerm.toLowerCase();
    return products.filter((product) => {
      const productString = `${product.marque} ${product.modele}`.toLowerCase();
      return productString.includes(searchTerm);
    });
  }
}

@Pipe({ name: 'sortByName' })
export class SortByNamePipe implements PipeTransform {
  transform(products: Product[], order: string = 'asc'): Product[] {
    if (!products) {
      return [];
    }

    return products.sort((a, b) => {
      return order === 'asc'
        ? a.marque.localeCompare(b.marque)
        : b.marque.localeCompare(a.marque);
    });
  }
}
