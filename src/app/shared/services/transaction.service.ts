import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {PaymentTransactions} from "../models/PaymentTransactions";

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    collectionName = 'Transactions';

    constructor(private firestore: AngularFirestore) {
    }

    addTransaction(transaction: PaymentTransactions) {
        return this.firestore.collection<PaymentTransactions>(this.collectionName).doc(transaction.id).set(transaction);
    }

    returnUserTransactions(user_id: string) {
        return this.firestore.collection<PaymentTransactions>(this.collectionName, ref => ref.where('user_id', '==', user_id)).valueChanges();
    }
}

