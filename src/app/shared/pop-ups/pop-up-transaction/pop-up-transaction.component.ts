import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {NgIf, NgStyle} from "@angular/common";
import {PaymentTransactions} from "../../models/PaymentTransactions";
import {TransactionService} from "../../services/transaction.service";
import {Route, Router} from "@angular/router";

@Component({
    selector: 'app-pop-up-transaction',
    standalone: true,
    imports: [
        MatDialogContent,
        MatFormField,
        MatLabel,
        MatSelect,
        MatDialogActions,
        MatOption,
        MatButton,
        MatInput,
        MatDialogClose,
        MatDialogTitle,
        NgIf,
        NgStyle
    ],
    templateUrl: './pop-up-transaction.component.html',
    styleUrl: './pop-up-transaction.component.scss'
})
export class PopUpTransactionComponent implements OnInit, OnDestroy {
    valtozo: boolean = false;
    totalPrice: number = 0;
    loggedInUser?: firebase.default.User | null;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<PopUpTransactionComponent>,
        private transactionService: TransactionService,
        private route: Router
    ) {
    }

    ngOnDestroy(): void {
        if (this.valtozo) {
            const transaction: PaymentTransactions = {
                id: 'FASZ3',
                address: 'kicsi',
                buyer_name: 'pistaa',
                date: new Date(),
                totalPrice: this.totalPrice,
                user_id: this.loggedInUser?.uid || ''
            };

            this.transactionService.addTransaction(transaction)
                .then(() => {
                    console.log('Transaction added successfully!');
                    // Close the dialog after successful transaction creation
                    this.route.navigateByUrl('/profile');
                    // this.dialogRef.close();
                })
                .catch(error => {
                    console.error('Error adding transaction: ', error);
                });
        }
    }

    ngOnInit(): void {
        this.totalPrice = this.data.totalAmount;
        this.loggedInUser = this.data.loggedInUser;
    }

    pay() {
        this.valtozo = true;
        this.dialogRef.close();
    }


}
