import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication/authentication.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';

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
    public auth: AuthService,
    public authenticationService: AuthenticationService,
  ) {}

  ngOnInit(): void {}

  onItemChange(value: string) {
    this.personType = value;
  }

  signUp() {
    this.authenticationService.SignUp(this.email, this.password, this.personType);
    console.log('this.email', this.email);
    this.email = '';
    this.password = '';
  }

  signIn() {
    this.authenticationService.SignIn(
      this.email,
      this.password,
      this.personType
    );
    this.email = '';
    this.password = '';
  }

  signOut() {
    this.authenticationService.SignOut();
  }
}
