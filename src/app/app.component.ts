import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "./shared/services/auth.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {PopUpNoUserComponent} from "./pages/pop-up-no-user/pop-up-no-user.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  page = '';
  routes: Array<string> = [];
  loggedInUser?: firebase.default.User | null;

  /* router: Router;
  constructor(router: Router) {
    this.router = router;
  } */

  constructor(private router: Router, private authService: AuthService, private dialogRef: MatDialog) {
    // parameter adattagok
  }

  openDialog(pageName: any) {
    this.dialogRef.open(PopUpNoUserComponent, {
      data: {
        pageName: pageName
      }
    });
  }

  ngOnInit() {
    // fat-arrow
    this.routes = this.router.config.map(conf => conf.path) as string[];

    // rxjs - reaktív programozás
    // subscribe
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
      if (this.routes.includes(currentPage)) {
        this.page = currentPage;
      }
    });

    this.authService.isUserLoggedIn().subscribe(user => {
      //console.log(user);
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser))
    }, error => {
      console.log(error);
      localStorage.setItem('user', JSON.stringify('null'));
    });
  }

  changePage(selectedPage: string) {
    // this.page = selectedPage;
    this.router.navigateByUrl(selectedPage);
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }

  logout(_?: boolean) {
    this.authService.logout().then(() => {
      //console.log("Logged out!");
    }).catch(error => {
      console.log(error);
    });
  }
}
