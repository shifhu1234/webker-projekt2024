import {Injectable} from '@angular/core';
import {Products} from "../models/Products";
import {Transaction} from "../models/Transaction";

@Injectable({
    providedIn: 'root'
})
export class BasketService {

  transactions: Transaction[] = [];

  constructor() {}

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
    console.log("hozzaadott: " + newTransaction.item.name)
  }

  getBasketTransactions(userId: string): Transaction[] {
    return this.transactions.filter(transaction => transaction.userId === userId);
  }

  calculateTotalAmount(userId: string): number {
    let totalAmount = 0;
    const userTransactions = this.getBasketTransactions(userId);
    for (const transaction of userTransactions) {
      totalAmount += transaction.totalPrice;
    }
    return totalAmount;
  }

  private generateTransactionId(): string {
    // Implement your own logic to generate transaction id
    return Math.random().toString(36).substring(2);
  }

}
