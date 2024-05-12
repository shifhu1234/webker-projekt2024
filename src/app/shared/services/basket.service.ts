import {Injectable} from '@angular/core';
import {Products} from "../models/Products";
import {Transaction} from "../models/Transaction";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  transactions: Transaction[] = [];

  constructor() {
  }

  emptyBasket() {
    this.transactions = [];
  }

  addToBasket(quantity: number, category: Products, userId: string) {
    const totalPrice = quantity * category.price;
    const newTransaction: Transaction = {
      id: this.generateTransactionId(),
      item: category,
      itemAmount: quantity,
      totalPrice: totalPrice,
      time: new Date().toISOString(),
      userId: userId
    };
    this.transactions.push(newTransaction);
  }
  removeItemFromBasket(userId: string, item: Products): void {
    const index = this.transactions.findIndex(transaction => transaction.userId === userId && transaction.item === item);
    if (index !== -1) {
      this.transactions.splice(index, 1);
    }
  }

  getBasketTransactions(userId: string): Transaction[] {
    return this.transactions.filter(transaction => transaction.userId === userId);
  }

  private generateTransactionId(): string {
    return Math.random().toString(36).substring(2);
  }

}
