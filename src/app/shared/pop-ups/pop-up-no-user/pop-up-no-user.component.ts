import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {NgIf, NgStyle} from "@angular/common";

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
        NgStyle,
        NgIf
    ],
    templateUrl: './pop-up-no-user.component.html',
    styleUrl: './pop-up-no-user.component.scss'
})
export class PopUpNoUserComponent implements OnInit {
    isThisBuyingPopUp: boolean = false;
    isThisFirstRegistration: boolean = false;
    holder: boolean = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        if (data.pageName === 'buying') {
            this.isThisBuyingPopUp = true;
        }
        if (data.pageName === 'firstRegister') {
            this.isThisFirstRegistration = false;
            this.holder = true;
        }
    }

    ngOnInit(): void {
        this.isThisFirstRegistration = true;
    }

}
