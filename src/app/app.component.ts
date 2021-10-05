import { Component } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { environment } from 'src/environments/environment';
import { GlobalVariable } from './shared/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'estudeme';
  hideSidebar: boolean = false;
  route: string;

  constructor(public globalVariable: GlobalVariable, private router: Router) {}

  ngOnInit(): void {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(environment.firebase);
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        var starCountRef = firebase.database().ref('users/' + user.uid);
        starCountRef.on('value', (snapshot) => {
          const data = snapshot.val();
          this.globalVariable.personType = data.personType;
        });
      } else {
        // User is signed out
        this.router.navigate(['/']);
      }
    });
  }
}
