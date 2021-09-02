import { Component } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'estudeme';

  constructor(private router: Router) {}

  ngOnInit(): void {
    firebase.initializeApp(environment.firebase);
    firebase.auth().onAuthStateChanged((user) => {
      console.log('user', user);
      if (user) {
        // User is signed in
        this.router.navigate(['/students']);
      } else {
        // User is signed out
        this.router.navigate(['/']);
      }
    });
  }
}
