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

  getLoggedInUserData(uid: string) {
    return this.afs.collection('Users').doc(uid).valueChanges();
  }

  updateEmail(emailChange: string) {
    return this.auth.currentUser.then((user) => {
      if (user) {
        const updatedUser = {...user, email: emailChange};
        localStorage.setItem('user', JSON.stringify(updatedUser));

        return user.updateEmail(emailChange)
          .then(() => {
            return this.afs.collection('Users').doc(user.uid).update({
              email: emailChange
            }).then(() => {
            }).catch((error) => {
              console.error(error);
            });
          })
          .catch((error) => {
            console.error(error);
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
            console.error(error);
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
        return user.delete()
          .then(() => {
            return this.afs.collection('Users').doc(user.uid).delete()
              .then(() => {
                console.log('Felhasználói profil sikeresen törölve');
              })
              .catch(error => {
                console.error(error);
                throw error;
              });
          })
          .catch(error => {
            console.error(error);
            throw error;
          });
      } else {
        throw new Error('Nincs bejelentkezett felhasználó');
      }
    }).catch(error => {
      console.error(error);
      throw error;
    });
  }

  updatePoints(uid: string, pointsToAdd: number) {
    return this.afs.collection<User>(this.collectionName).doc(uid).update({
      points: pointsToAdd
    });
  }


}
