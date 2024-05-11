import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PopUpNoUserComponent} from "../pop-ups/pop-up-no-user/pop-up-no-user.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {

    @Input() currentPage: string = '';
    @Input() loggedInUser?: firebase.default.User | null;
    @Output() selectedPage: EventEmitter<string> = new EventEmitter();
    @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
    @Output() onLogout: EventEmitter<boolean> = new EventEmitter();

    constructor(private dialogRef: MatDialog) {
        console.log('constructor called.');
    }

    openDialog(pageName: any) {
        if (!this.loggedInUser) {
            this.dialogRef.open(PopUpNoUserComponent, {
                data: {
                    pageName: pageName
                }
            });
        }
    }

    ngOnInit(): void {
        console.log('ngOnInit called.');
    }

    ngAfterViewInit(): void {
        console.log('ngAfterViewInit called.');
    }

    menuSwitch() {
        this.selectedPage.emit(this.currentPage);
    }

    close(logout?: boolean) {
        this.onCloseSidenav.emit(true);
        if (logout === true) {
            this.onLogout.emit(logout);
        }
    }


}
