import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "./shared/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {PopUpNoUserComponent} from "./shared/pop-ups/pop-up-no-user/pop-up-no-user.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    page = '';
    routes: Array<string> = [];
    loggedInUser?: firebase.default.User | null;

    constructor(private router: Router, private authService: AuthService, private dialogRef: MatDialog) {
    }

    getLoggedInUser() {
        return this.loggedInUser;
    }

    openDialog(pageName: any) {
        if (!this.loggedInUser) {
            this.dialogRef.open(PopUpNoUserComponent, {
                data: {
                    pageName: pageName
                }
            });
        }
    }

    ngOnInit() {
        this.routes = this.router.config.map(conf => conf.path) as string[];
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
            const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
            if (this.routes.includes(currentPage)) {
                this.page = currentPage;
            }
        });
        this.authService.isUserLoggedIn().subscribe(user => {
            this.loggedInUser = user;
            localStorage.setItem('user', JSON.stringify(this.loggedInUser))
        }, error => {
            console.log(error);
            localStorage.setItem('user', JSON.stringify('null'));
        });
    }

    changePage(selectedPage: string) {
        this.router.navigateByUrl(selectedPage).then(_ => {
        });
    }

    onToggleSidenav(sidenav: MatSidenav) {
        sidenav.toggle().then(_ => {
        });
    }

    onClose(event: any, sidenav: MatSidenav) {
        if (event === true) {
            sidenav.close().then(_ => {
            });
        }
    }

    logout(_?: boolean) {
        this.authService.logout().then(() => {
        }).catch(error => {
            console.log(error);
        });
    }
}
