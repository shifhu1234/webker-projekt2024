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
  categoryImagesFiltered: string[] = [];
  isFilterActive: boolean = false;

  @Output() selectedCategory: EventEmitter<string> = new EventEmitter<string>();
  @Input() filteredProducts: Products[] = [];

  constructor(private productsService: ProductsService) {
  }

  ngOnChanges(): void {

  }

  teszt?: Products[];

  ngOnInit(): void {
    this.loadCategoryImages();
    this.productsService.getProducts().subscribe((data: Products[]) => {
      this.products = data;


      for (const a of data) {
        console.log(a.name);
      }
    });


    this.productsService.getFruitProducts().subscribe((data: Products[]) => {
      this.teszt = data;

      for (const a of data) {
        console.log("teszt: " + a.name);
      }


    });

  }

  private loadCategoryImages(): void {
    this.categoriesName.forEach(category => {
      const imageUrl = `assets/${category}Kategoria.jpg`;
      this.categoryImages.push(imageUrl);
    });
  }

  private loadFilteredCategoryImages(categoryType: string): void {
    this.categoryImagesFiltered = [];
    this.filteredProducts.forEach(category => {
      const imageUrl = `assets/img${categoryType.charAt(0).toUpperCase()}${categoryType.slice(1)}/${category.image_url}`;
      //console.log(imageUrl);
      this.categoryImagesFiltered.push(imageUrl);
      //console.log("kateg " + category.image_url);
    })
  }

  onSelectCategory(category: string): void {
    this.filteredProducts = [];
    for (const item of this.products as any)
      if (category as string === item.type as string) {
        this.filteredProducts.push(item); // Add matching products to the filtered list
        console.log(item.name)
      }
    this.isFilterActive = true;
    this.loadFilteredCategoryImages(category);
    this.selectedCategory.emit(category);
    // console.log(this.filteredProducts.length)
    //   return this.filteredProducts.length;
  }

  goBackToCategoires() {
    this.filteredProducts = [];
    this.isFilterActive = false;
  }
}
