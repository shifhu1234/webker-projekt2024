import {Injectable} from '@angular/core';
import {Products} from "../models/Products";

@Injectable({
    providedIn: 'root'
})
export class BasketService {

    basketItems: any[] = [];

    constructor() {
    }


    addToBasket(quantity: number, category: Products) {
        this.basketItems.push({ quantity: quantity, category: category });
    }

    getBasketItems() {
        return this.basketItems;
    }

}
