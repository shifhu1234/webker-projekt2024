import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Transaction} from "../models/Transaction";
import {User} from "../models/User";
import {PaymentTransactions} from "../models/PaymentTransactions";

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    constructor(private firestore: AngularFirestore) { }

    addTransaction(transaction: PaymentTransactions) {
        //console.log(transaction);
        return this.firestore.collection<PaymentTransactions>('Transactions').doc(transaction.id).set(transaction);
    }
}
