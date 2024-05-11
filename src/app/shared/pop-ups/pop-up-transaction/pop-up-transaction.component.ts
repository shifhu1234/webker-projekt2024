import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-pop-up-transaction',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatSelect,
    MatDialogActions,
    MatOption,
    MatButton,
    MatInput,
    MatDialogClose,
    MatDialogTitle,
    NgIf,
    NgStyle
  ],
  templateUrl: './pop-up-transaction.component.html',
  styleUrl: './pop-up-transaction.component.scss'
})
export class PopUpTransactionComponent implements OnInit{
  totalPrice?: number = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void{
    this.totalPrice = this.data.totalAmount;
  }
  // closeDialog() {
  //   this.dialogRef.close();
  // }
}
