import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {NgIf, NgStyle} from "@angular/common";
import {PaymentTransactions} from "../../models/PaymentTransactions";
import {TransactionService} from "../../services/transaction.service";
import {Router, RouterLink} from "@angular/router";
import {NameFormatPipe} from "../../pipes/name-format.pipe";
import {UserService} from "../../services/user.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {BasketService} from "../../services/basket.service";
import {PopUpErrorTransactionComponent} from "../pop-up-error-transaction/pop-up-error-transaction.component";

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
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './pop-up-transaction.component.html',
  styleUrl: './pop-up-transaction.component.scss'
})
export class PopUpTransactionComponent implements OnInit, OnDestroy {
  valtozo: boolean = false;
  totalPrice: number = 0;
  loggedInUser?: any;    // firebase.default.User | null;
  loggedInUserUID: any;
  transactionForm = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    address: new FormControl(''),
    paymentMethod: new FormControl('')
  });
  noInfoTransaction: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialog,
    private transactionService: TransactionService,
    private route: Router,
    private userService: UserService,
    private basketService: BasketService
  ) {
  }

  ngOnInit(): void {
    this.totalPrice = this.data.totalAmount;
    this.loggedInUserUID = this.data.loggedInUserUID;
    this.userService.getLoggedInUserData(this.loggedInUserUID).subscribe(user => {
      this.loggedInUser = user;
    });
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
          const pointsToAdd = Math.floor(this.totalPrice / 100) + this.loggedInUser.points;
          this.userService.updatePoints(this.loggedInUserUID, pointsToAdd)
            .then(() => {
              this.basketService.emptyBasket();
              // console.log('Pontok frissítve');
            })
            .catch(error => {
              console.error(error);
            });

          this.route.navigateByUrl('/profile').then(_ => {
          });
        })
        .catch(error => {
          console.error(error);
        });

    }
  }

  sendTransaction() {
    this.noInfoTransaction = false;

    if (this.transactionForm.get('address')?.value
      && this.transactionForm.get('paymentMethod')?.value) {
      this.valtozo = true;
      this.dialogRef.closeAll();
    } else {
      this.noInfoTransaction = true;
      this.dialogRef.open(PopUpErrorTransactionComponent, {
        width: '250px',
        data: {message: 'Nem töltöttél ki minden mezőt!'}
      });
    }
  }

  private generateTransactionId(): string {
    return Math.random().toString(36).substring(2);
  }
}
