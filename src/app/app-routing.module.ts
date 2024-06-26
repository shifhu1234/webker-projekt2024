import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./shared/services/auth.guard";

const routes: Routes = [
    {
        path: 'main',
        loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
        canActivate: []
    },
    {
        path: 'products',
        loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)
    },
    {
        path: 'delivery',
        loadChildren: () => import('./pages/delivery/delivery.module').then(m => m.DeliveryModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
    },
    {
        path: 'contact',
        loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
    },
    {
        path: 'basket',
        loadChildren: () => import('./pages/basket/basket.module').then(m => m.BasketModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'coupons',
        loadChildren: () => import('./pages/coupons/coupons.module').then(m => m.CouponsModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'not-found',
        loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
    },
    {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
    },
    {path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
    {path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule)},
    {
        path: '**',
        redirectTo: '/not-found'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
