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
  selector: 'app-pop-up-error-registration',
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
  templateUrl: './pop-up-error-registration.component.html',
  styleUrl: './pop-up-error-registration.component.scss'
})
export class PopUpErrorRegistrationComponent  implements OnInit{
  message: any;
  title: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
  ngOnInit(): void {
    this.message = this.data.message;
    if (this.data.pageName === 'pageRegistration'){
      this.title = 'Sikertelen regisztráció!';
    }else if( this.data.pageName === 'pageLogin'){
      this.title = 'Sikertelen bejelentkezés!';
    }else{
      this.title = 'Hiba!'
    }
  }
}
