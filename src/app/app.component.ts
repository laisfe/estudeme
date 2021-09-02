import { Component } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { GlobalVariable } from './shared/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'estudeme';

  constructor(private router: Router, public globalVariable: GlobalVariable) {}

  ngOnInit(): void {
    firebase.initializeApp(environment.firebase);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        var starCountRef = firebase.database().ref('users/' + user.uid);
        starCountRef.on('value', (snapshot) => {
          const data = snapshot.val();
          this.globalVariable.personType = data.personType;
        });
        if (this.globalVariable.personType === 'professor') {
          this.router.navigate(['/students']);
        } else {
          this.router.navigate(['/documents']);
        }
      } else {
        // User is signed out
        this.router.navigate(['/']);
      }
    });
  }
}
