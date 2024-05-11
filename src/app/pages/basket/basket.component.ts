import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BasketService} from "../../shared/services/basket.service";
import {NgForOf, NgIf} from "@angular/common";
import {Transaction} from "../../shared/models/Transaction";
import {UserService} from "../../shared/services/user.service";
import {AppComponent} from "../../app.component";
import {CouponsFormatPipe} from "../../shared/pipes/coupons-format.pipe";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {MatButton} from "@angular/material/button";

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
    NgIf
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit, OnChanges {
  basketTransactions: Transaction[] = [];
  totalAmount: number = 0;
  loggedInUser?: firebase.default.User | null;
  userId?: string;
  discount: number = 0;
  totalAmountNoCoupons: number = 0;
  constructor(private basketService: BasketService, private userService: UserService, private appComponent: AppComponent, private route: ActivatedRoute) {
  }

  ngOnChanges(): void {
    // this.discount = 0;
  }

  ngOnInit(): void {
    this.loggedInUser = this.appComponent.getLoggedInUser();
    if (this.loggedInUser) {
      // console.log("uid " + this.loggedInUser.uid)
      this.userId = this.loggedInUser.uid;
      this.basketTransactions = this.basketService.getBasketTransactions(this.userId);
      this.calculateTotalAmount();
    }
    this.route.queryParams.subscribe(params => {
      this.discount = +params['discount'];
      this.totalAmount = this.totalAmountNoCoupons * (1-this.discount)
    });
  }

  calculateTotalAmount() {
    let totalAmount = 0;
    for (const transaction of this.basketTransactions) {
      totalAmount += transaction.totalPrice;
    }
    this.totalAmountNoCoupons = totalAmount;
  }

  removeCoupon() {
    this.discount = 0;
  }
}
