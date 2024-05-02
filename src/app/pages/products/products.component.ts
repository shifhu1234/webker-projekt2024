import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {FlexModule} from "@angular/flex-layout";
import {Products} from "../../shared/models/Products";
import {ProductsService} from "../../shared/services/products.service";
import {MatButtonModule} from "@angular/material/button";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatCardModule,
    NgForOf,
    FlexModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})

export class ProductsComponent implements OnInit, OnChanges {
  categories = ['Gyümölcs', 'Zöldség', 'Méz', 'Szárazáru'];
  categoriesName = ['fruit', 'vegetable', 'honey', 'pasta'];
  products?: Products[];
  categoryImages: string[] = [];

  @Output() selectedCategory: EventEmitter<string> = new EventEmitter<string>();
  @Input() filteredProducts: Products[] = [];
  constructor(private productsService: ProductsService) {
  }

  ngOnChanges(): void {

    }


  ngOnInit(): void {
    this.loadCategoryImages();
    this.productsService.getProducts().subscribe((data: Products[]) => {
      this.products = data;

      //console.log("az adatok: " +JSON.stringify(data));
      // for (const item of data) {
      //   const name = item.name;
      //   const type = item.type;
      //   const imageUrl = item.image_url;
      //   console.log(name, type, imageUrl);
      // }

    });
  }

  private loadCategoryImages(): void {
    this.categoriesName.forEach(category => {
      const imageUrl = `assets/${category}Kategoria.jpg`;
      this.categoryImages.push(imageUrl);
    });
  }

  onSelectCategory(category: string): void {
    this.filteredProducts = [];
    for (const item of this.products as any)
    if (category as string === item.type as string){
      this.filteredProducts.push(item); // Add matching products to the filtered list
      console.log(item.name)
    }

    this.selectedCategory.emit(category);

  }
}
