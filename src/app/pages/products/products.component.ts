import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {FlexModule} from "@angular/flex-layout";
import {Products} from "../../shared/models/Products";
import {ProductsService} from "../../shared/services/products.service";
import {MatButtonModule} from "@angular/material/button";
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatCardModule,
    NgForOf,
    FlexModule,
    MatButtonModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})

export class ProductsComponent implements OnInit{
  categories = ['Gyümölcs', 'Zöldség', 'Méz', 'Szárazáru'];
  categoriesName = ['gyumolcs', 'zoldseg', 'mez', 'szarazaru'];
  products?: Products[];
  categoryImages: string[] = [];

  @Output() showAllProducts: EventEmitter<any> = new EventEmitter();

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.loadCategoryImages();
    this.productsService.getProducts().subscribe((data: Products[]) => {
      this.products = data;
    });
  }

  private loadCategoryImages(): void {
    this.categoriesName.forEach(category => {
      const imageUrl = `assets/${category}Kategoria.jpg`;
      this.categoryImages.push(imageUrl);
    });
  }


}
