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
import {Router} from "@angular/router";
import {NameFormatPipe} from "../../pipes/name-format.pipe";
import {UserService} from "../../services/user.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

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
        NgStyle,
        NameFormatPipe,
        ReactiveFormsModule
    ],
    templateUrl: './pop-up-transaction.component.html',
    styleUrl: './pop-up-transaction.component.scss'
})
export class PopUpTransactionComponent implements OnInit, OnDestroy {
    valtozo: boolean = false;
    totalPrice: number = 0;
    loggedInUser?: any;    // firebase.default.User | null;
    loggedInUserUID: any;
    selected?: string;
    transactionForm = new FormGroup({
        email: new FormControl(''),
        name: new FormControl(''),
        address: new FormControl(''),
        paymentMethod: new FormControl('')
    });
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<PopUpTransactionComponent>,
        private transactionService: TransactionService,
        private route: Router,
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.totalPrice = this.data.totalAmount;
        this.loggedInUserUID = this.data.loggedInUserUID;
        this.userService.getLoggedInUserData(this.loggedInUserUID).subscribe(user => {
            this.loggedInUser = user;
        });
        //this.selected = this.transactionForm.get('paymentMethod')?.value as string;
    }

    ngOnDestroy(): void {
        if (this.valtozo) {
            const transaction: PaymentTransactions = {
                id: this.generateTransactionId(),
                address: this.transactionForm.get('address')?.value as string,
                //buyer_name: this.loggedInUser.name,
                date: new Date(),
                totalPrice: this.totalPrice,
                user_id: this.loggedInUserUID || ''
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

    sendTransaction() {
        this.valtozo = true;
        this.dialogRef.close();
    }

    private generateTransactionId(): string {

        return Math.random().toString(36).substring(2);
    }
}
