import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {FlexModule} from "@angular/flex-layout";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatCardModule,
    NgForOf,
    FlexModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  categories = ['Gyümölcs', 'Zöldség', 'Méz', 'Szárazáru'];
}
