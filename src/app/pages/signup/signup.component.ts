import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";
import {Products} from "../../shared/models/Products";
import {PopUpNoUserComponent} from "../../shared/pop-ups/pop-up-no-user/pop-up-no-user.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });
  constructor(private router: Router, private location: Location, private authService: AuthService, private userService: UserService, private dialogRef: MatDialog) { }

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
    this.authService.signup(this.signUpForm.get('email')?.value as string, this.signUpForm.get('password')?.value as string).then(cred =>{
      //console.log(cred);
      const user: User = {
        id: cred.user?.uid as string,
        email: this.signUpForm.get('email')?.value as string,
        username: this.signUpForm.get('email')?.value?.split('@')[0] as string,
        name:{
          firstname: this.signUpForm.get('name.firstname')?.value as string,
          lastname: this.signUpForm.get('name.lastname')?.value as string
        },
        points: 30
      };
      this.userService.create(user).then(_ =>{
        this.openDialogBuying('firstRegister');
        //console.log('USER ADDED SUCCESSFULLY.');
        this.router.navigateByUrl('/main');
      }).catch(error =>{
        console.log(error);
      });

    }).catch(error=>{
      console.log(error);
    });
    //console.log(this.signUpForm.value);
  }



  // goBack() {
  //   this.location.back();
  // }

}
