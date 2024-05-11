import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Coupons} from "../../shared/models/Coupons";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AsyncPipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CouponsFormatPipe} from "../../shared/pipes/coupons-format.pipe";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {FlexModule} from "@angular/flex-layout";
import {Router, RouterLink} from "@angular/router";

@Component({
    selector: 'app-coupons',
    standalone: true,
    imports: [
        AsyncPipe,
        NgForOf,
        FormsModule,
        CouponsFormatPipe,
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardTitle,
        MatIcon,
        NgStyle,
        MatInput,
        MatFormField,
        MatLabel,
        FlexModule,
        NgIf,
        RouterLink
    ],
    templateUrl: './coupons.component.html',
    styleUrl: './coupons.component.scss'
})
export class CouponsComponent implements OnInit {
    couponsFromCollection?: Observable<Coupons[]>;
    coupons?: Coupons[];
    filterValue: number = 0;

    constructor(private firestore: AngularFirestore, private router: Router) {
    }

    ngOnInit(): void {
        this.getCoupons();
    }

    onInputChange(newValue: number) {

        if (newValue > 100) {
            this.filterValue = 100;
        }
        this.getCoupons();
    }

    goToBasket(discount: number) {
        this.router.navigate(['/basket'], {queryParams: {discount: discount}});
    }

    getCoupons() {
        this.couponsFromCollection = this.firestore.collection<Coupons>('Coupons', ref =>
            ref.where('discount', '>=', this.filterValue * 0.01).orderBy('discount', 'desc')
        ).valueChanges();

        this.couponsFromCollection.subscribe(value => {
            this.coupons = value;
        })
    }
}
