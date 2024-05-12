import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from "../../shared/services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    email = new FormControl<string>('', [Validators.required, Validators.email]);
    password = new FormControl<string>('', [Validators.required, Validators.minLength(6)]);


    loadingSubscription?: Subscription;
    loading: boolean = false;

    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    async login() {
        this.loading = true;
        this.authService.login(this.email.value as string, this.password.value as string).then(cred => {
            this.router.navigateByUrl('/main');
            this.loading = false;
        }).catch(error => {
            console.log(error);
            this.loading = false;
        });

    }

    ngOnDestroy() {
        this.loadingSubscription?.unsubscribe();
    }
}
