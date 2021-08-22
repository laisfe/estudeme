// import { Injectable } from '@angular/core';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as auth from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googelSignin() {
    const provider = new auth.default.auth.GoogleAuthProvider();
    const credencial = await this.afAuth.signInWithPopup(provider);
    console.log('**credencial.user', credencial.user)
    return this.updateUserData(credencial.user);
  }

  async signOut() {
    await await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData({ uid, email, displayName, photoURL }: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${uid}`
    );
    const data = {
      uid,
      email,
      displayName,
      photoURL,
    };
    return userRef.set(data, { merge: true });
  }
}
