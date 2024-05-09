import {Component, OnInit} from '@angular/core';
import {BasketService} from "../../shared/services/basket.service";
import {NgForOf} from "@angular/common";

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
  basketItems: any[] = [];

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basketItems = this.basketService.getBasketItems();
    console.log("basket: "+ this.basketItems);
    for (const a of this.basketItems){
      console.log(a.price)
    }
  }
}
