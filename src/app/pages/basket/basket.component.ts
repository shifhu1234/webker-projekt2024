import {Component, OnInit} from '@angular/core';
import {BasketService} from "../../shared/services/basket.service";
import {NgForOf, NgIf} from "@angular/common";
import {Transaction} from "../../shared/models/Transaction";
import {AppComponent} from "../../app.component";
import {CouponsFormatPipe} from "../../shared/pipes/coupons-format.pipe";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {PopUpTransactionComponent} from "../../shared/pop-ups/pop-up-transaction/pop-up-transaction.component";

@Component({
    selector: 'app-basket',
    standalone: true,
    imports: [
        NgForOf,
        CouponsFormatPipe,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
        MatButton,
        NgIf,
        RouterLink
    ],
    templateUrl: './basket.component.html',
    styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {
    basketTransactions: Transaction[] = [];
    totalAmount: number = 0;
    totalAmountNoDiscount: number = 0;
    loggedInUser?: firebase.default.User | null;
    userId?: string;
    discount: number = 0;

    constructor(
        private basketService: BasketService,
        private appComponent: AppComponent,
        private route: ActivatedRoute,
        private dialogRef: MatDialog,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.loggedInUser = this.appComponent.getLoggedInUser();
        if (this.loggedInUser) {
            this.userId = this.loggedInUser.uid;
            this.basketTransactions = this.basketService.getBasketTransactions(this.userId);
            this.calculateTotalAmount();
        }
        this.route.queryParams.subscribe(params => {
            this.discount = +params['discount'] || 0;
            this.totalAmount = this.totalAmountNoDiscount * (1 - this.discount);
        });
    }

    openTransactionDialog(): void {
        this.dialogRef.open(PopUpTransactionComponent, {
            width: '400px',
            data: {
                totalAmount: this.totalAmount,
                loggedInUserUID: this.loggedInUser?.uid,
            }
        });
    }

  emptyBasket(){
      this.basketService.emptyBasket();
      location.reload();
  }
    calculateTotalAmount(): void {
        this.totalAmountNoDiscount = this.basketTransactions.reduce((total, transaction) => {
            return total + transaction.totalPrice;
        }, 0);
        console.log('Total amount without discount:', this.totalAmountNoDiscount);
        this.totalAmount = this.totalAmountNoDiscount * (1 - this.discount);
    }

    removeCoupon(): void {
        this.discount = 0;
        this.router.navigate(['/basket']);
    }
}
