import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  email: string;
  password: string;
  personType: string;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  goToLoginPage(): void {
    this.router.navigate(['/']);
  }

  signUp() {
    this.authenticationService.SignUp(
      this.email,
      this.password,
      this.personType
    );
    this.email = '';
    this.password = '';
  }

  onItemChange(value: string) {
    this.personType = value;
  }
}
