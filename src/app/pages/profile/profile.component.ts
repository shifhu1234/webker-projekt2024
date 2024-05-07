import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {Router} from "@angular/router";
import {UserService} from "../../shared/services/user.service";

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
        FlexModule
    ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent {
    loggedInUser: any;

    // emailChange = new FormControl<string>('');
    // passwordChange = new FormControl<string>('');
    // passwordAgainChange = new FormControl<string>('');

    userDataChangeGroup = new FormGroup({
        emailChange: new FormControl<string>(''),
        passwordChange: new FormControl<string>(''),
        passwordAgainChange: new FormControl<string>('')
    });

    constructor(private userService: UserService, private router: Router) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        this.loggedInUser = user;
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



