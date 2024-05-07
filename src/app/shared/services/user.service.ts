import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../models/User";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    collectionName = 'Users';


    constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {

    }

    create(user: User) {
        return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
    }

    getAll() {

    }

    // email verification: ki kellett szedni firebaseben a Email enumeration protection (recommended) -t,
    // hogy meg lehessen valtopztatni

    updateEmail(emailChange: string) {
        return this.auth.currentUser.then((user) => {
            if (user) {
                const updatedUser = {...user, email: emailChange};
                localStorage.setItem('user', JSON.stringify(updatedUser));

                return user.updateEmail(emailChange)
                    .then(() => {
                        console.log('EMAIL SIKERESEN FRISITVE');

                        return this.afs.collection('Users').doc(user.uid).update({
                            email: emailChange
                        }).then(() => {
                            console.log('SIKERES FRISSITES');
                        }).catch((error) => {
                            console.error('Hiba', error);
                        });
                    })
                    .catch((error) => {
                        console.error('Hiba', error);
                        throw error;
                    });
            } else {
                return Promise.resolve();
            }
        });
    }

    updatePassword(passwordChange: string) {
        return this.auth.currentUser.then((user) => {
            if (user) {
                // const updatedUser = {...user, password: passwordChange};
                // localStorage.setItem('user', JSON.stringify(updatedUser));

                return user.updatePassword(passwordChange)
                    .then(() => {
                        console.log('JELSZO SIKERESEN FRISITVE');

                        return this.afs.collection('Users').doc(user.uid).update({
                            password: passwordChange
                        }).then(() => {
                            console.log('SIKERES FRISSITES JELSZO');
                        }).catch((error) => {
                            console.error('Hiba', error);
                        });
                    })
                    .catch((error) => {
                        console.error('Hiba', error);
                        throw error;
                    });
            } else {
                return Promise.resolve();
            }
        });
    }


    // update(emailChange: string) {
    //     return this.auth.currentUser.then((user) => {
    //         if (user) {
    //             const updatedUser = { ...user, email: emailChange }; // Email cím frissítése
    //             localStorage.setItem('user', JSON.stringify(updatedUser));
    //
    //             // Az e-mail cím frissítése
    //             return user.updateEmail(emailChange)
    //                 .then(() => {
    //                     // Az e-mail cím sikeresen frissítve az autentikációs adatokban
    //                     console.log('Az e-mail cím sikeresen frissítve az autentikációs adatokban.');
    //
    //                     // Frissítsd az e-mail címet az adatbázisban
    //                     return this.afs.collection('Users').doc(user.uid).update({
    //                         email: emailChange
    //                         // Itt nem kell más mezőket frissíteni, csak az e-mail címet
    //                     }).then(() => {
    //                         console.log('Felhasználói adatok sikeresen frissítve.');
    //                     }).catch((error) => {
    //                         console.error('Hiba történt a felhasználói adatok frissítése közben:', error);
    //                     });
    //                 })
    //                 .catch((error) => {
    //                     // Hiba történt az e-mail cím frissítése közben
    //                     console.error('Hiba történt az e-mail cím frissítése közben:', error);
    //                     throw error; // Dobd tovább a hibát, hogy kezelhesd azt a hívó kódban
    //                 });
    //         } else {
    //             console.error('Nincs bejelentkezett felhasználó.');
    //             return Promise.resolve(); // Üres Promise visszaadása
    //         }
    //     });
    // }


    // update(emailChange: string){
    //
    //   return this.auth.currentUser.then((user) => {
    //     if (user) {
    //       // Frissítsd a localStorage-t
    //       const updatedUser = { ...user, email: emailChange }; // Email cím frissítése
    //       localStorage.setItem('user', JSON.stringify(updatedUser));
    //       // Frissítsd az AFS-ben tárolt adatokat
    //       return this.afs.collection('Users').doc(user.uid).update({
    //         email: emailChange
    //         // Itt nem kell más mezőket frissíteni, csak az email címet
    //       }).then(() => {
    //         console.log('Felhasználói adatok sikeresen frissítve.');
    //       }).catch((error) => {
    //         console.error('Hiba történt a felhasználói adatok frissítése közben:', error);
    //       });
    //     } else {
    //       console.error('Nincs bejelentkezett felhasználó.');
    //       return Promise.resolve(); // Üres Promise visszaadása
    //     }
    //   });
    // }

    delete() {

    }
}
