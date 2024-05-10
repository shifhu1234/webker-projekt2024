import {Products} from "./Products";

export interface Transaction {
    id: string;
    item: Products;
    itemAmount: number;
    totalPrice: number;
    time: string;
}
