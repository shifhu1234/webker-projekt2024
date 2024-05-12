import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatLabel} from "@angular/material/form-field";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-pop-up-error-transaction',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatLabel,
    NgIf
  ],
  templateUrl: './pop-up-error-transaction.component.html',
  styleUrl: './pop-up-error-transaction.component.scss'
})
export class PopUpErrorTransactionComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  message: any;
  ngOnInit(): void {
    this.message = this.data.message;
  }

}
