import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuComponent} from './shared/menu/menu.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatListItem, MatNavList} from "@angular/material/list";
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getStorage, provideStorage} from '@angular/fire/storage';
//import * as firebase from 'firebase/app';
//firebase.initializeApp(environment.firebase);
import {FIREBASE_OPTIONS} from '@angular/fire/compat'
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconButton,
        MatIcon,
        FlexLayoutModule,
        MatNavList,
        MatListItem,
        //AngularFireModule.initializeApp(environment.firebase),
        //provideFirebaseApp(() => initializeApp(environment.firebase)),
        //AngularFireModule.initializeApp(environment.firebase),
        provideFirebaseApp(() => initializeApp({
            "apiKey": "AIzaSyDins7KBe3vEBr57f_Vj-4ZFKSWstpBJW8",
            "authDomain": "webfejl-projekt-2024.firebaseapp.com",
            "projectId": "webfejl-projekt-2024",
            "storageBucket": "webfejl-projekt-2024.appspot.com",
            "messagingSenderId": "237724793716",
            "appId": "1:237724793716:web:ea394c11a58f1c1ce90a21",
            "measurementId": "G-GD9JWHNEYS"
        })),        //provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage())
    ],
    providers: [
        provideAnimationsAsync(),
        provideHttpClient(),
        {
            provide: FIREBASE_OPTIONS, useValue: {
                "apiKey": "AIzaSyDins7KBe3vEBr57f_Vj-4ZFKSWstpBJW8",
                "authDomain": "webfejl-projekt-2024.firebaseapp.com",
                "projectId": "webfejl-projekt-2024",
                "storageBucket": "webfejl-projekt-2024.appspot.com",
                "messagingSenderId": "237724793716",
                "appId": "1:237724793716:web:ea394c11a58f1c1ce90a21",
                "measurementId": "G-GD9JWHNEYS"
            }
        }
    ],

    bootstrap: [AppComponent]
})
export class AppModule {
}
