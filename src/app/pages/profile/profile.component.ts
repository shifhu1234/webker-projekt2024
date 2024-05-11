import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../shared/services/user.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {CommonModule, NgIf, NgStyle} from "@angular/common";
import {NameFormatPipe} from "../../shared/pipes/name-format.pipe";
import {TransactionService} from "../../shared/services/transaction.service";
import {Observable} from "rxjs";
import {PaymentTransactions} from "../../shared/models/PaymentTransactions";
import {FirebaseDateFormatPipe} from "../../shared/pipes/firebase-date-format.pipe";

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
        RouterLink,
        FirebaseDateFormatPipe
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

    constructor(private userService: UserService, private router: Router, private afAuth: AngularFireAuth, private transactionService: TransactionService) {
    }

    ngOnInit(): void {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.currentUser = user;
                this.userService.getLoggedInUserData(user.uid).subscribe(userData => {
                    this.loggedInUser = userData;
                    if (this.loggedInUser) {
                        this.getUserTransactions(this.currentUser.uid).subscribe(transactions => {
                            this.userTransactions = transactions;
                        });
                    }
                });
            } else {
                this.currentUser = null;
            }
        });
    }

    getUserTransactions(userId: string): Observable<PaymentTransactions[]> {
        return this.transactionService.returnUserTransactions(userId);
    }

    passwordCheck(passwordChangeValue: string, passwordAgainChangeValue: string) {
        if (passwordChangeValue &&
            passwordAgainChangeValue &&
            (passwordChangeValue === passwordAgainChangeValue) &&
            (passwordChangeValue.length >= 6)) {
            this.userService.updatePassword(passwordChangeValue)
                .then(() => {
                    console.log('Jelszó sikeresen frissítve');
                    location.reload();
                })
                .catch(error => {
                    console.error('Hiba a jelszó frissítésekor', error);
                });
        } else {
            location.reload();
        }
    }

    changeUserData() {
        const emailChangeValue = this.userDataChangeGroup.get('emailChange')?.value as string;
        const passwordChangeValue = this.userDataChangeGroup.get('passwordChange')?.value as string;
        const passwordAgainChangeValue = this.userDataChangeGroup.get('passwordAgainChange')?.value as string;

        if (emailChangeValue && emailChangeValue.includes('@')) {
            this.userService.updateEmail(emailChangeValue)
                .then(() => {
                    console.log('Email sikeresen frissítve');
                    this.passwordCheck(passwordChangeValue, passwordAgainChangeValue);
                })
                .catch(error => {
                    console.error('Hiba az email frissítésekor', error);
                });
        } else {
            this.passwordCheck(passwordChangeValue, passwordAgainChangeValue);
        }
    }

    deleteProfile(): void {
        if (confirm('Biztosan törölni szeretnéd a felhasználói profilodat?')) {
            this.userService.delete()
                .then(() => {
                    this.router.navigateByUrl('/').then(_ => {
                    });
                })
                .catch(error => {
                    console.error('Hiba a profil törlésekor', error);
                });
        }
    }
}



