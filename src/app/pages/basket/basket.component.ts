import {Component, OnInit} from '@angular/core';
import {BasketService} from "../../shared/services/basket.service";
import {NgForOf} from "@angular/common";
import {Transaction} from "../../shared/models/Transaction";
import {UserService} from "../../shared/services/user.service";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit{
  basketTransactions: Transaction[] = [];
  totalAmount: number = 0;
  loggedInUser?: firebase.default.User | null;
  constructor(private basketService: BasketService, private userService: UserService, private appComponent: AppComponent) {}
  userId?: string;

  ngOnInit(): void {
    this.loggedInUser = this.appComponent.getLoggedInUser();
    if (this.loggedInUser){
      console.log("uid " + this.loggedInUser.uid)
      this.userId = this.loggedInUser.uid;
      this.basketTransactions = this.basketService.getBasketTransactions(this.userId);
      this.calculateTotalAmount();
    }
  }

  calculateTotalAmount() {
    let totalAmount = 0;
    for (const transaction of this.basketTransactions) {
      totalAmount += transaction.totalPrice;
    }
    this.totalAmount = totalAmount;
  }
}
