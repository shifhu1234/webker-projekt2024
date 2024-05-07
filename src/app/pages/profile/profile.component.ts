import {Component, OnInit} from '@angular/core';
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
import {NameFormatPipe} from "../../shared/pipes/name-format.pipe";


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
        NgIf,
        NameFormatPipe
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
    loggedInUser: any;
    currentUser: any = null;

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
            //console.log('Felhasználó adatai:', userData);
            this.loggedInUser = userData;
            //console.log("loggedin: " + this.loggedInUser)
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
        // const user = JSON.parse(localStorage.getItem('user') || '{}');
        // this.loggedInUser = user;

        /*if (this.loggedInUser && this.loggedInUser.email) {
            const emailParts = this.loggedInUser.email.split('@');
            if (emailParts.length > 0) {
                this.loggedInUser.name = emailParts[0];
            }
        }*/
    }


    changeUserData() {
        const emailChangeValue = this.userDataChangeGroup.get('emailChange')?.value as string;
        const passwordChangeValue = this.userDataChangeGroup.get('passwordChange')?.value as string;
        const passwordAgainChangeValue = this.userDataChangeGroup.get('passwordAgainChange')?.value as string;

        if (emailChangeValue && emailChangeValue.includes('@')) {
            this.userService.updateEmail(emailChangeValue)
                .then(() => {
                    console.log('Email sikeresen frissítve');
                    if (passwordChangeValue &&
                        passwordAgainChangeValue &&
                        (passwordChangeValue === passwordAgainChangeValue) &&
                        (passwordChangeValue.length >= 6)) {
                        this.userService.updatePassword(passwordChangeValue)
                            .then(() => {
                                console.log('Jelszó sikeresen frissítve');
                                console.log('Minden frissítés sikeres');
                                location.reload();
                            })
                            .catch(error => {
                                console.error('Hiba a jelszó frissítésekor', error);
                            });
                    } else {
                        console.log('Minden frissítés sikeres');
                        location.reload();
                    }
                })
                .catch(error => {
                    console.error('Hiba az email frissítésekor', error);
                });
        } else {
            if (passwordChangeValue &&
                passwordAgainChangeValue &&
                (passwordChangeValue === passwordAgainChangeValue) &&
                (passwordChangeValue.length >= 6)) {
                this.userService.updatePassword(passwordChangeValue)
                    .then(() => {
                        console.log('Jelszó sikeresen frissítve');
                        console.log('Minden frissítés sikeres');
                        location.reload();
                    })
                    .catch(error => {
                        console.error('Hiba a jelszó frissítésekor', error);
                    });
            } else {
                console.log('Minden frissítés sikeres');
                location.reload();
            }
        }
    }

    // changeUserData() {
    //     const emailChangeValue = this.userDataChangeGroup.get('emailChange')?.value as string;
    //     const passwordChangeValue = this.userDataChangeGroup.get('passwordChange')?.value as string;
    //     const passwordAgainChangeValue = this.userDataChangeGroup.get('passwordAgainChange')?.value as string;
    //
    //     const updateEmailPromise = emailChangeValue && emailChangeValue.includes('@') ?
    //         this.userService.updateEmail(emailChangeValue) : Promise.resolve();
    //
    //     const updatePasswordPromise = passwordChangeValue &&
    //     passwordAgainChangeValue &&
    //     (passwordChangeValue === passwordAgainChangeValue) &&
    //     (passwordChangeValue.length >= 6) ?
    //         this.userService.updatePassword(passwordChangeValue) : Promise.resolve();
    //
    //     Promise.all([updateEmailPromise, updatePasswordPromise])
    //         .then(() => {
    //             console.log('Minden frissítés sikeres');
    //             location.reload();
    //         })
    //         .catch(error => {
    //             console.error('Hiba a frissítés során', error);
    //         });
    // }


        // aszinkron...
        // const emailChangeValue = this.userDataChangeGroup.get('emailChange')?.value as string;
        // if (emailChangeValue && emailChangeValue.includes('@')) {
        //     this.userService.updateEmail(emailChangeValue)
        //         .then(() => {
        //             console.log('Email sikeresen frissítve');
        //             //location.reload();
        //         })
        //         .catch((error) => {
        //             console.error('Hiba', error);
        //         });
        // } else {
        //     // Ha az email nem megfelelő, itt kezelheted le
        // }
        //
        // const passwordChangeValue = this.userDataChangeGroup.get('passwordChange')?.value as string;
        // const passwordAgainChangeValue = this.userDataChangeGroup.get('passwordAgainChange')?.value as string;
        //
        // if (
        //     passwordChangeValue &&
        //     passwordAgainChangeValue &&
        //     (passwordChangeValue === passwordAgainChangeValue) &&
        //     (passwordChangeValue.length >= 6)
        // ) {
        //     this.userService.updatePassword(passwordChangeValue)
        //         .then(() => {
        //             console.log('Jelszó sikeresen frissítve');
        //         })
        //         .catch((error) => {
        //             console.error('Hiba', error);
        //         });
        // } else {
        //     console.log("A jelszó nem megfelelő");
        // }
        //
        // location.reload();


    deleteProfile(): void {
        if (confirm('Biztosan törölni szeretnéd a felhasználói profilodat?')) {
            // Törlés megerősítve, hívjuk meg a UserService deleteProfile metódusát
            this.userService.delete()
                .then(() => {
                    // Sikeres törlés, navigáljunk a bejelentkező oldalra vagy a kezdőlapra
                    this.router.navigateByUrl('/');
                })
                .catch(error => {
                    console.error('Hiba a profil törlésekor', error);
                });
        }
    }

}



