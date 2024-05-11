import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgIf, NgStyle} from "@angular/common";
import {PaymentTransactions} from "../../models/PaymentTransactions";
import {TransactionService} from "../../services/transaction.service";

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
export class PopUpTransactionComponent implements OnInit{
  totalPrice: number = 0;
  loggedInUser?: firebase.default.User | null;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private transactionService: TransactionService) { }

  ngOnInit(): void{
    this.totalPrice = this.data.totalAmount;
    this.loggedInUser = this.data.loggedInUser;
  }


  pay(){
        const transaction: PaymentTransactions = {
          id: 'aasdas',
          address: 'kicsi',
          buyer_name: 'pistaa',
          date: new Date(),
          totalPrice: this.totalPrice,
          user_id: this.loggedInUser?.uid as string
        };

        this.transactionService.addTransaction(transaction).then(() => {
          console.log('Transaction added successfully!');
        }).catch(error => {
          console.error('Error adding transaction: ', error);
        });
  }
  // closeDialog() {
  //   this.dialogRef.close();
  // }
}
