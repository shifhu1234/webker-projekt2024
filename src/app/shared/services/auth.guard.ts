import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot, UrlTree
} from '@angular/router';
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | MaybeAsync<GuardResult> {
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (user){
      return true;
    }
    return false;
  }
}

// export const authGuard: CanActivateFn = (route, state) => {
//   const user = JSON.parse(localStorage.getItem('user') as string);
//   if (user){
//     return true;
//   }
//   return false;
// };
