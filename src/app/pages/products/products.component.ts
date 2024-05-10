import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {FlexModule} from "@angular/flex-layout";
import {Products} from "../../shared/models/Products";
import {ProductsService} from "../../shared/services/products.service";
import {MatButtonModule} from "@angular/material/button";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {MatSelectModule} from "@angular/material/select";
import {BasketService} from "../../shared/services/basket.service";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "../../app.component";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {PopUpNoUserComponent} from "../../shared/pop-ups/pop-up-no-user/pop-up-no-user.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Transaction} from "../../shared/models/Transaction";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatCardModule,
    NgForOf,
    FlexModule,
    MatButtonModule,
    NgIf,
    MatSelectModule,
    FormsModule,
    NgStyle,
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

  quantities: number[] = [1, 2, 3, 4, 5, 6];
  //selectedQuantities: number[] = new Array(this.filteredProducts.length).fill(1);
  selectedQuantities: number[] = [];
  transaction: Transaction[] = [];
  loggedInUser?: firebase.default.User | null;

  constructor(private productsService: ProductsService, private storage: AngularFireStorage,
              private basketService: BasketService, private appComponent: AppComponent, private _snackBar: MatSnackBar, private dialogRef: MatDialog, private router: Router) {
  }

  addToBasket(quantity: number, category: Products) {
    if (this.loggedInUser && quantity >= 1) {
      this.basketService.addToBasket(quantity, category, this.loggedInUser.uid);
      this.openSnackBarSuccesful('Kosárba rakva!');
    } else {
      this.openDialogBuying('buying');
    }
  }

  openDialogBuying(pageName: any) {
    if (!this.loggedInUser) {
      this.dialogRef.open(PopUpNoUserComponent, {
        data: {
          pageName: pageName
        }
      });
    }
  }

  openSnackBarSuccesful(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1000;
    config.horizontalPosition = 'center';
    config.politeness = "polite";
    config.verticalPosition = 'top'; //
    this._snackBar.open(message, undefined, config);
  }

  ngOnChanges(): void {
    this.createCategoryCards();
  }

  ngOnInit(): void {
    this.loggedInUser = this.appComponent.getLoggedInUser();
    //console.log('bejelentkezve: ', this.loggedInUser)
    this.selectedQuantities = new Array(this.filteredProducts.length).fill(1);
    this.loadCategoryImages();
    this.productsService.getProducts().subscribe((data: Products[]) => {
      this.products = data;
      this.imagesLoaded = true;
    });
  }

  loadCategoryImages(): void {
    const imageObservables: Observable<string>[] = this.productsService.getCategoryImages(this.categoriesName);
    for (let i = 0; i < this.categoriesName.length; i++) {
      imageObservables[i].subscribe((url: string) => {
        this.categoryImages[i] = url;
      });
    }
  }

  onSelectCategory(category: string): void {
    this.filteredProducts = [];
    for (const item of this.products as any)
      if (category as string === item.type as string) {
        this.filteredProducts.push(item);
      }
    this.isFilterActive = true;
    this.loadFilteredCategoryImages(category);
    this.selectedCategory.emit(category);
    this.createCategoryCards();
  }

  goBackToCategoires() {
    this.filteredProducts = [];
    this.isFilterActive = false;
    this.createCategoryCards();
  }

  goToBasket() {
    this.router.navigateByUrl('/basket');
  }

  private loadFilteredCategoryImages(categoryType: string): void {

    this.categoryImagesFiltered = [];
    this.filteredProducts.forEach((category: Products) => {
      if (category.type === categoryType) { // Ellenőrizd, hogy a termék kategóriája megegyezik-e a megadott kategóriával
        this.productsService.getFirebaseImage(category.image_url).subscribe((url: string) => {
          this.categoryImagesFiltered.push(url)

        });
      }
    });

  }

  private createCategoryCards(): void {
    if (this.imagesLoaded) {
      this.categoryImagesFiltered = []; // Régi képek törlése
      for (let i = 0; i < this.filteredProducts.length; i++) {
        const category = this.filteredProducts[i];
        this.productsService.getFirebaseImage(category.image_url).subscribe((url: string) => {
          this.categoryImagesFiltered[i] = url;
        });
      }
    }
  }
}
