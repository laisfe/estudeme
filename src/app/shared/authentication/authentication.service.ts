import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

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
  SignUp(email: string, password: string, personType: string) {
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
          });
      })
      .catch((error) => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string, personType: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('Successfully signed in!');
        // console.log('res', res);
        // console.log('res.user.uid', res.user.email);
        this.router.navigate(['/students']);
        // firebase
        //   .database()
        //   .ref('users/' + res.user.uid)
        //   .set({
        //     uid: res.user.uid,
        //     email: email,
        //     loginType: loginType,
        //   });
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
