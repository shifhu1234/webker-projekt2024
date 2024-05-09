import { Component, OnInit } from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  loggedInUser: any; // Változó létrehozása a bejelentkezett felhasználó adatainak tárolására

  constructor(private userService: UserService, private afAuth: AngularFireAuth) { } // Injektáljuk a UserService-t a konstruktorban

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // Bejelentkezett felhasználó UID-jének lekérése
        const uid = user.uid;
        // Bejelentkezett felhasználó adatainak lekérése a UID alapján
        this.userService.getLoggedInUserData(uid).subscribe(userData => {
          this.loggedInUser = userData;
        });
      }
    });
  }

}
