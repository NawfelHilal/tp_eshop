import { Pipe, PipeTransform } from "@angular/core";
import { Product } from "../models/product.model";

@Pipe({ name: "sortByDate" })
export class SortByDatePipe implements PipeTransform {
  transform(product: Product[], order?: any) {
    let desc = !(order && order === "asc");
    return product.sort((a, b) => {
      if (desc) return b.date.getTime() - a.date.getTime();
      else return a.date.getTime() - b.date.getTime();
    });
  }
}

@Pipe({ name: "search" })
export class SearchPipe implements PipeTransform {
  transform(products: Product[], searchTerm: string): Product[] {
    if (!searchTerm) {
      return products; // Aucune recherche, retournez la liste complète.
    }

    searchTerm = searchTerm.toLowerCase();

    return products.filter((product) => {
      // Filtrer les produits qui correspondent au terme de recherche.
      const productString = `${product.marque} ${product.modele}`.toLowerCase();
      return productString.includes(searchTerm);
    });
  }
}

@Pipe({ name: "sortByName" })
export class SortByNamePipe implements PipeTransform {
  transform(products: Product[], order: string): Product[] {
    if (!products) {
      return [];
    }

    if (order === "asc") {
      return products.sort((a, b) => a.marque.localeCompare(b.marque));
    } else if (order === "desc") {
      return products.sort((a, b) => b.marque.localeCompare(a.marque));
    }

    return products;
  }
}
