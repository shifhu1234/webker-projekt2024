import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {FakeLoadingService} from '../../shared/services/fake-loading.service';
import {AuthService} from "../../shared/services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    email = new FormControl<string>('');
    password = new FormControl<string>('');

    loadingSubscription?: Subscription;
    loadingObservation?: Observable<boolean>;
    loading: boolean = false;

    constructor(private router: Router, private loadingService: FakeLoadingService, private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    async login() {
        this.loading = true;
        // Promise
        /* this.loadingService.loadingWithPromise(this.email.value, this.password.value).then((_: boolean) => {
          console.log('This executed second.');
          this.router.navigateByUrl('/main');
        }).catch(error => {
          console.error(error, 'Incorrect email or password!');
        }).finally(() => {
          console.log('this is executed finally.');
        }); */

        // async-await
        /* try {
          // then
          const _ = await this.loadingService.loadingWithPromise(this.email.value, this.password.value)
          this.router.navigateByUrl('/main');
        } catch (error) {
          // catch
          console.error(error, 'Incorrect email or password!');
        }
        // finally
        console.log('this is executed finally.'); */

        // Observable
        // memory leak
        // this.loadingObservation = this.loadingService.loadingWithObservable(this.email.value as string, this.password.value as string)
        // this.loadingSubscription = this.loadingObservation
        //   .subscribe(
        //     {
        //       next: (data: boolean) => {
        //         //console.log(data);
        //         this.router.navigateByUrl('/main');
        //         this.loading = false;
        //       }, error: (error) => {
        //         console.error(error);
        //       }, complete: () => {
        //         console.log('finally');
        //       }
        //     }
        //   );

        this.authService.login(this.email.value as string, this.password.value as string).then(cred => {
            //console.log(cred);
            this.router.navigateByUrl('/main');
            this.loading = false;
        }).catch(error =>{
            this.loading = false;
            //console.log(error);
        });

    }

    ngOnDestroy() {
        this.loadingSubscription?.unsubscribe();
    }

}
