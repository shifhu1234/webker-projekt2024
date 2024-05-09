import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Products} from "../models/Products";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient, private afs: AngularFirestore, private storage: AngularFireStorage) {
    }

    collectionName = 'images';

    getProducts(): Observable<Products[]> {
        return this.http.get<Products[]>('assets/products.json');
    }

    getAfsProducts(): Observable<Products[]>{
        return this.afs.collection<Products>(this.collectionName).valueChanges();
        //return this.afs.collection<Products>(`${this.collectionName}/imgFruit`).valueChanges();
    }

  getFirebaseImage(imageName: string): Observable<any> {
    const storageRef = this.storage.ref('images/' + imageName);
    return storageRef.getDownloadURL();
  }
    getCategoryImages(categoryNames: string[]): Observable<string>[] {
        return categoryNames.map((categoryName: string) => {
            return this.getFirebaseImage(`${categoryName}Kategoria.jpg`);
        });
    }
}
