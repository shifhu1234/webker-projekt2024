import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Products} from "../models/Products";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>('assets/products.json');
  }

  // Gyümölcs termékek lekérése
  getFruitProducts(): Observable<Products[]> {
    return this.getProducts().pipe(
      map(products => products.filter(product => product.type === 'fruit'))
    );
  }
  getVegetableProducts(): Observable<Products[]> {
    return this.getProducts().pipe(
      map(products => products.filter(product => product.type === 'vegetable'))
    );
  }

  getHoneyProducts(): Observable<Products[]> {
    return this.getProducts().pipe(
      map(products => products.filter(product => product.type === 'honey'))
    );
  }
  getPastaProducts(): Observable<Products[]> {
    return this.getProducts().pipe(
      map(products => products.filter(product => product.type === 'pasta'))
    );
  }


}
