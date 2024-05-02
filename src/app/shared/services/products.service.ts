import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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

  // getFruitProducts(): Observable<Products[]> {
  //   return this.http.get('../constants/products_fruit.ts') as Observable<Products[]>;
  // }
}
