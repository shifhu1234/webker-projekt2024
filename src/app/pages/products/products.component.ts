import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {FlexModule} from "@angular/flex-layout";
import {Products} from "../../shared/models/Products";
import {ProductsService} from "../../shared/services/products.service";
import {MatButtonModule} from "@angular/material/button";
import {Observable} from "rxjs";
import {combineChange} from "@angular/fire/compat/firestore";

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
  categoryImagesFiltered: any = [];
  isFilterActive: boolean = false;
  imagesLoaded: boolean = false;

  @Output() selectedCategory: EventEmitter<string> = new EventEmitter<string>();
  @Input() filteredProducts: Products[] = [];

  constructor(private productsService: ProductsService) {
  }

  ngOnChanges(): void {
    this.createCategoryCards();
  }

  ngOnInit(): void {
    this.loadCategoryImages();
    this.productsService.getProducts().subscribe((data: Products[]) => {
      this.products = data;
      this.imagesLoaded = true;

      //console.log("data: " + data);

    });
  }

  private loadCategoryImages(): void {
    this.productsService.getAfsProducts().subscribe((data: Products[]) => {
      data.forEach((product: Products) => {
        this.productsService.getFirebaseImage(product.image_url).subscribe((url: string) => {
          this.categoryImages.push(url);
        });
      });
    });

    // this.categoriesName.forEach(category => {
    //     const imageUrl = `assets/${category}Kategoria.jpg`;
    //     this.categoryImages.push(imageUrl);
    // });
  }

  private loadFilteredCategoryImages(categoryType: string): void {
    // this.categoryImagesFiltered = [];
    // this.filteredProducts.forEach(category => {
    //     const imageUrl = `assets/img${categoryType.charAt(0).toUpperCase()}${categoryType.slice(1)}/${category.image_url}`;
    //     //console.log(imageUrl);
    //     this.categoryImagesFiltered.push(imageUrl);
    //     //console.log("kateg " + category.image_url);
    // })
    //
    //
    this.categoryImagesFiltered = [];
    this.filteredProducts.forEach((category: Products) => {
      if (category.type === categoryType) { // Ellenőrizd, hogy a termék kategóriája megegyezik-e a megadott kategóriával
        this.productsService.getFirebaseImage(category.image_url).subscribe((url: string) => {
          this.categoryImagesFiltered.push(url)

          //console.log('category.image_url: ' + category.image_url + 'url '+  url);
        });
      }
    });

  }

  onSelectCategory(category: string): void {
    this.filteredProducts = [];
    for (const item of this.products as any)
      if (category as string === item.type as string) {
        this.filteredProducts.push(item);
        //console.log(item.name)
      }
    this.isFilterActive = true;
    //console.log("kategoria: " + category)
    this.loadFilteredCategoryImages(category);
    this.selectedCategory.emit(category);
    this.createCategoryCards();

    // console.log(this.filteredProducts.length)
    //   return this.filteredProducts.length;
  }
  private createCategoryCards(): void {
    if (this.imagesLoaded) {
      this.categoryImagesFiltered = []; // Régi képek törlése
      for (let i = 0; i < this.filteredProducts.length; i++) {
        const category = this.filteredProducts[i];
        this.productsService.getFirebaseImage(category.image_url).subscribe((url: string) => {
          this.categoryImagesFiltered[i] = url; // Megfelelő indexre helyezés
        });
      }
    }
  }
  goBackToCategoires() {
    this.filteredProducts = [];
    this.isFilterActive = false;
    this.createCategoryCards();
  }
}
