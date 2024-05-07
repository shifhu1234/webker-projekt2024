import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {Router} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {NgIf} from "@angular/common";
import {user} from "@angular/fire/auth";

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [
        FormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        MatButtonModule,
        ReactiveFormsModule,
        FlexModule,
        NgIf
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
    users: any[] = [];
    loggedInUser: any;
    currentUser: any = null;
    // ngOnInit(): void {
    //     this.afs.collection('Users').get().subscribe(snapshot => {
    //         snapshot.forEach(doc => {
    //             const user = doc.data();
    //             this.users.push(user);
    //             console.log(user);
    //         });
    //     });
    // }
    ngOnInit(): void {
        // Jelenleg bejelentkezett felhasználó lekérése
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.currentUser = user;
                this.getLoggedInUserData(user.uid); // Felhasználó adatainak lekérése az adatbázisból
            } else {
                this.currentUser = null;
            }
        });
    }


    getLoggedInUserData(uid: string) {
        // Felhasználó adatainak lekérése Firestore-ból az uid alapján
        this.afs.collection('Users').doc(uid).valueChanges().subscribe(userData => {
            console.log('Felhasználó adatai:', userData);
            this.loggedInUser = userData;
            console.log("loggedin: " + this.loggedInUser)
            // Itt kezelheted a felhasználó adatait, pl. frissítheted a komponensben tárolt változókat
        });

    }


    // emailChange = new FormControl<string>('');
    // passwordChange = new FormControl<string>('');
    // passwordAgainChange = new FormControl<string>('');

    userDataChangeGroup = new FormGroup({
        emailChange: new FormControl<string>(''),
        passwordChange: new FormControl<string>(''),
        passwordAgainChange: new FormControl<string>('')
    });

    constructor(private userService: UserService, private router: Router, private afs: AngularFirestore, private afAuth: AngularFireAuth) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        this.loggedInUser = user;
        // for (const a in this.loggedInUser){
        //     console.log("a: "+a);
        // }
        if (this.loggedInUser && this.loggedInUser.email) {
            const emailParts = this.loggedInUser.email.split('@');
            if (emailParts.length > 0) {
                this.loggedInUser.name = emailParts[0];
            }
        }
    }

    changeUserData() {
        const emailChangeValue = this.userDataChangeGroup.get('emailChange')?.value as string;
        if (emailChangeValue && emailChangeValue.includes('@')) {
            this.userService.update(emailChangeValue)
                .then(() => {
                    console.log('adatok sikeresen frissitve');
                    location.reload();
                })
                .catch((error) => {
                    console.error('hiba', error);
                });
        } else {
            this.router.navigateByUrl('/main');
        }
    }
}



