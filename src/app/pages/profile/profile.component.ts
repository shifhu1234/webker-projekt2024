import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {CommonModule, NgIf, NgStyle} from "@angular/common";
import {NameFormatPipe} from "../../shared/pipes/name-format.pipe";
import {TransactionService} from "../../shared/services/transaction.service";
import {async, Observable} from "rxjs";
import {PaymentTransactions} from "../../shared/models/PaymentTransactions";
import {collectionSnapshots} from "@angular/fire/firestore";

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        MatButtonModule,
        ReactiveFormsModule,
        FlexModule,
        NgIf,
        NameFormatPipe,
        NgStyle,
        RouterLink
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

    loggedInUser: any;
    currentUser: any = null;
    userTransactions: any;
    userDataChangeGroup = new FormGroup({
        emailChange: new FormControl<string>(''),
        passwordChange: new FormControl<string>(''),
        passwordAgainChange: new FormControl<string>('')
    });

    constructor(private userService: UserService, private router: Router, private afs: AngularFirestore, private afAuth: AngularFireAuth, private transactionService: TransactionService) {
    }

    ngOnInit(): void {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.currentUser = user;
                //console.log("jelenlegi: "+this.currentUser.uid);
                this.userService.getLoggedInUserData(user.uid).subscribe(userData => {
                    this.loggedInUser = userData;
                    if (this.loggedInUser) {
                        this.getUserTransactions(this.currentUser.uid).subscribe(transactions => {
                            //console.log("USERID: "+ this.currentUser.uid)
                            this.userTransactions = transactions;
                            this.userTransactions.forEach((transaction: { formattedDate: any; date: any; }) => {
                                transaction.formattedDate = this.formatDate(transaction.date);
                            });
                            // console.log("user: "+ this.userTransactions)
                        });
                    }
                });
            } else {
                this.currentUser = null;
            }
        });
    }
    formatDate(timestamp: any): string {
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        return date.toLocaleString(); // Vagy a megfelelő formázási metódust használhatod itt
    }

    getUserTransactions(userId: string): Observable<PaymentTransactions[]> {
        return this.transactionService.returnUserTransactions(userId);
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

    protected readonly length = length;
}



