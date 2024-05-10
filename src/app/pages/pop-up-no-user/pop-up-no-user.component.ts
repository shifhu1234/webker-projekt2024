import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule, MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-pop-up-no-user',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogTitle,
    RouterLink,
    NgStyle
  ],
  templateUrl: './pop-up-no-user.component.html',
  styleUrl: './pop-up-no-user.component.scss'
})
export class PopUpNoUserComponent implements OnInit{
  userName: any;
  ngOnInit(): void {

  }
constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
this.userName = data.name;
}
}
