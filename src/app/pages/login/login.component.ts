import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication/authentication.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {}

  goToSignUpPage(): void {
    this.router.navigate(['/signup']);
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
}
