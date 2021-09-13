import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication/authentication.service';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/app/shared/globals';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  personType: string;
  userData: Observable<firebase.User>;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    public globalVariable: GlobalVariable
  ) { }

  ngOnInit(): void {
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

  goToSignUpPage(): void {
    this.router.navigate(['/signup']);
  }

  signIn() {
    this.authenticationService.SignIn(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
