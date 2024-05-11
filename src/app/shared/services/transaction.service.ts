import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {PaymentTransactions} from "../models/PaymentTransactions";

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    collectionName = 'Transactions';

    constructor(private firestore: AngularFirestore) {}

    addTransaction(transaction: PaymentTransactions){
        console.log('FASZPICSFASZFASZPICSFASZFASZPICSFASZFASZPICSFASZ: ', transaction);
        return this.firestore.collection<PaymentTransactions>(this.collectionName).doc(transaction.id).set(transaction);
        // return this.firestore.collection<PaymentTransactions>(this.collectionName).add(transaction);
    }
}

