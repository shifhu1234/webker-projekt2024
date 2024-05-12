import {Injectable} from '@angular/core';
import {Products} from "../models/Products";
import {Transaction} from "../models/Transaction";

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  //
  transactions: Transaction[] = [];
  //
  // constructor() {
  // }
  //
  // emptyBasket() {
  //   this.transactions = [];
  // }
  //
  // addToBasket(quantity: number, category: Products, userId: string) {
  //   const totalPrice = quantity * category.price;
  //   const newTransaction: Transaction = {
  //     id: this.generateTransactionId(),
  //     item: category,
  //     itemAmount: quantity,
  //     totalPrice: totalPrice,
  //     time: new Date().toISOString(),
  //     userId: userId
  //   };
  //   this.transactions.push(newTransaction);
  // }
  // removeItemFromBasket(userId: string, item: Products): void {
  //   const index = this.transactions.findIndex(transaction => transaction.userId === userId && transaction.item === item);
  //   if (index !== -1) {
  //     this.transactions.splice(index, 1);
  //   }
  // }
  //
  // getBasketTransactions(userId: string): Transaction[] {
  //   return this.transactions.filter(transaction => transaction.userId === userId);
  // }
  //
  // private generateTransactionId(): string {
  //   return Math.random().toString(36).substring(2);
  // }
  private storageKey = 'basketTransactions';

  constructor() {
    this.loadBasketTransactions();
  }

  emptyBasket() {
    localStorage.removeItem(this.storageKey);
  }

  private loadBasketTransactions(): void {
    const transactionsString = localStorage.getItem(this.storageKey);
    if (transactionsString) {
      this.transactions = JSON.parse(transactionsString);
    }
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
    let transactions = this.getBasketTransactionsFromStorage() || [];
    transactions.push(newTransaction);
    localStorage.setItem(this.storageKey, JSON.stringify(transactions));
  }

  removeItemFromBasket(userId: string, item: Products): void {
    let transactions = this.getBasketTransactionsFromStorage() || [];
    const index = transactions.findIndex(transaction => transaction.userId === userId && transaction.item.id === item.id);
    if (index !== -1) {
      transactions.splice(index, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(transactions));
    }
  }

  getBasketTransactions(userId: string): Transaction[] {
    const transactions = this.getBasketTransactionsFromStorage();
    if (transactions) {
      return transactions.filter(transaction => transaction.userId === userId);
    } else {
      return [];
    }
  }

  private generateTransactionId(): string {
    return Math.random().toString(36).substring(2);
  }

  private getBasketTransactionsFromStorage(): Transaction[] | null {
    const transactionsString = localStorage.getItem(this.storageKey);
    return transactionsString ? JSON.parse(transactionsString) : null;
  }
}
