import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from "../../shared/services/auth.service";
import {
  PopUpErrorRegistrationComponent
} from "../../shared/pop-ups/pop-up-error-registration/pop-up-error-registration.component";
import {MatDialog} from "@angular/material/dialog";

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

  constructor(private router: Router, private authService: AuthService, private dialogRef: MatDialog) {
  }

  ngOnInit(): void {
  }

  async login() {

    if (this.email.valid && this.password.valid) {
      this.loading = true;
      this.authService.login(this.email.value as string, this.password.value as string).then(cred => {
        this.router.navigateByUrl('/main');
        this.loading = false;
      }).catch(error => {
        if (error.code == "auth/user-not-found") {
          this.dialogRef.open(PopUpErrorRegistrationComponent, {
            width: '350px',
            data: {message: 'Nem létező email cím (nem létezik a fiók)!'}
          });
        }
        //console.log(error);
        this.loading = false;
      });
    } else {
      if (this.email.invalid) {
        this.dialogRef.open(PopUpErrorRegistrationComponent, {
          width: '350px',
          data: {message: 'Helytelen email címet adtál meg!'}
        });
      } else if (this.password.invalid) {
        this.dialogRef.open(PopUpErrorRegistrationComponent, {
          width: '350px',
          data: {message: 'Helytelen jelszót adtál meg!'}
        });
      } else {
        this.dialogRef.open(PopUpErrorRegistrationComponent, {
          width: '350px',
          data: {message: 'Nem töltöttél ki minden mezőt!'}
        });
      }
    }
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }
}
