import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Coupons} from "../../shared/models/Coupons";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AsyncPipe, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CouponsFormatPipe} from "../../shared/pipes/coupons-format.pipe";

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    FormsModule,
    CouponsFormatPipe
  ],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss'
})
export class CouponsComponent implements OnInit{
  couponsFromCollection?: Observable<Coupons[]>;
  coupons?: Coupons[];
  filterValue: number = 0;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.getCoupons();
  }

  getCoupons() {
    this.couponsFromCollection = this.firestore.collection<Coupons>('Coupons', ref =>
      ref.where('discount', '>=', this.filterValue*0.01).orderBy('discount', 'desc')
    ).valueChanges();

    this.couponsFromCollection.subscribe(value => {
      this.coupons = value;
    })
  }
}
