import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";
import {PopUpNoUserComponent} from "../../shared/pop-ups/pop-up-no-user/pop-up-no-user.component";
import {MatDialog} from "@angular/material/dialog";
import {
  PopUpErrorRegistrationComponent
} from "../../shared/pop-ups/pop-up-error-registration/pop-up-error-registration.component";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name: new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required])
    })
  });

  constructor(private router: Router, private authService: AuthService, private userService: UserService, private dialogRef: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialogBuying(pageName: any) {
    this.dialogRef.open(PopUpNoUserComponent, {
      data: {
        pageName: pageName
      }
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.authService.signup(this.signUpForm.get('email')?.value as string, this.signUpForm.get('password')?.value as string).then(cred => {
        const user: User = {
          id: cred.user?.uid as string,
          email: this.signUpForm.get('email')?.value as string,
          username: this.signUpForm.get('email')?.value?.split('@')[0] as string,
          name: {
            firstname: this.signUpForm.get('name.firstname')?.value as string,
            lastname: this.signUpForm.get('name.lastname')?.value as string
          },
          points: 30
        };
        this.userService.create(user).then(_ => {
          this.openDialogBuying('firstRegister');
          //console.log('USER ADDED SUCCESSFULLY.');
          this.router.navigateByUrl('/main').then(_ => {
          });
        }).catch(error => {

          if (error.code == "auth/email-already-in-use") {
            this.dialogRef.open(PopUpErrorRegistrationComponent, {
              width: '350px',
              data: {
                message: 'A megadott e-mail cím már használatban van egy másik fiókban!',
                pageName: 'pageRegistration'
              }
            });
          }
          //console.log(error);
        });

      }).catch(error => {
        if (error.code == "auth/email-already-in-use") {
          this.dialogRef.open(PopUpErrorRegistrationComponent, {
            width: '350px',
            data: {
              message: 'A megadott e-mail cím már használatban van egy másik fiókban!',
              pageName: 'pageRegistration'
            }
          });
        }
        //console.log(error);
      });
    } else {
      if (this.signUpForm.get('email')?.hasError('email') || this.signUpForm.get('email')?.invalid) {
        this.dialogRef.open(PopUpErrorRegistrationComponent, {
          width: '350px',
          data: {message: 'Hibás email címet adtál meg!', pageName: 'pageRegistration'}
        });
      } else if (this.signUpForm.get('password')?.invalid) {
        this.dialogRef.open(PopUpErrorRegistrationComponent, {
          width: '350px',
          data: {message: 'Hibás jelszó vagy nem egyeznek a jelszavak!', pageName: 'pageRegistration'}
        });
      } else {
        this.dialogRef.open(PopUpErrorRegistrationComponent, {
          width: '350px',
          data: {message: 'Nem töltöttél ki minden mezőt!', pageName: 'pageRegistration'}
        });
      }
    }


  }
}
