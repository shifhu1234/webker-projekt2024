import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    loggedInUser: any;

    constructor(private userService: UserService, private afAuth: AngularFireAuth) {
    }


    ngOnInit(): void {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                const uid = user.uid;
                this.userService.getLoggedInUserData(uid).subscribe(userData => {
                    this.loggedInUser = userData;
                });
            }
        });
    }

}
