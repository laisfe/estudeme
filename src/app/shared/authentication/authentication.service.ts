import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/database'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: Observable<firebase.User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.userData = angularFireAuth.authState;
  }

  /* Sign up */
  SignUp(email: string, password: string, personType: string, bornDate: Date, scholarYear: string, idClassSelected: number) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('Successfully signed up!', res);
        console.log('***res', res);
        this.router.navigate(['/students']);
        firebase
          .database()
          .ref('users/' + res.user.uid)
          .set({
            uid: res.user.uid,
            email: email,
            personType: personType,
            bornDate: bornDate,
            scholarYear: scholarYear,
            idClassSelected: idClassSelected
          });
      })
      .catch((error) => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('Successfully signed in!');
        this.router.navigate(['/students']);
        var starCountRef = firebase.database().ref('users/' + res.user.uid);
        starCountRef.on('value', (snapshot) => {
          const data = snapshot.val();
          console.log('data', data)
        });
      })
      .catch((err) => {
        console.log('Something is wrong:', err.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth.signOut();
    this.router.navigate(['/']);
  }
}
