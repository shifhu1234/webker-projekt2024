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

  getLoggedInUserData(uid: string) {
    // Felhasználó adatainak lekérése Firestore-ból az uid alapján
    return this.afs.collection('Users').doc(uid).valueChanges();
  }

    updateEmail(emailChange: string) {
        return this.auth.currentUser.then((user) => {
            if (user) {
                const updatedUser = { ...user, email: emailChange };
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

    updatePassword(passwordChange: string): Promise<void> {
        return this.auth.currentUser.then((user) => {
            if (user) {
                return user.updatePassword(passwordChange)
                    .then(() => {
                        console.log('Jelszó sikeresen frissítve');
                    })
                    .catch((error) => {
                        console.error('Hiba a jelszó frissítésekor', error);
                        throw error;
                    });
            } else {
                throw new Error('Nincs bejelentkezett felhasználó');
            }
        });
    }

    // email verification: ki kellett szedni firebaseben a Email enumeration protection (recommended) -t,
    // hogy meg lehessen valtopztatni

    delete(): Promise<void> {
        return this.auth.currentUser.then(user => {
            if (user) {
                // Felhasználó törlése az autentikációs rendszerből
                return user.delete()
                    .then(() => {
                        // Felhasználói adatok törlése a Firestore-ból
                        return this.afs.collection('Users').doc(user.uid).delete()
                            .then(() => {
                                console.log('Felhasználói profil sikeresen törölve');
                            })
                            .catch(error => {
                                console.error('Hiba a felhasználói adatok törlésekor', error);
                                throw error;
                            });
                    })
                    .catch(error => {
                        console.error('Hiba a felhasználó törlésekor', error);
                        throw error;
                    });
            } else {
                throw new Error('Nincs bejelentkezett felhasználó');
            }
        }).catch(error => {
            console.error('Hiba a felhasználó törlésekor', error);
            throw error;
        });
    }


}
