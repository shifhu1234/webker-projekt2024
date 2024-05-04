import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Products} from "../models/Products";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient, private afs: AngularFirestore) {
    }

    collectionName = 'images';

    getProducts(): Observable<Products[]> {
        return this.http.get<Products[]>('assets/products.json');
    }

    getAfsProducts(): Observable<Products[]>{
        return this.afs.collection<Products>(this.collectionName).valueChanges();
        //return this.afs.collection<Products>(`${this.collectionName}/imgFruit`).valueChanges();
    }

}
