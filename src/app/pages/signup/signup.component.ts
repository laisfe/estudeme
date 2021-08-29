import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication/authentication.service';
import { ClassesList } from './models/classes';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  email: string;
  password: string;
  personType: string;
  bornDate: Date;
  scholarYear: string;
  classesList: ClassesList[];
  idClassSelected: number;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private signupService: SignupService
  ) {}

  ngOnInit(): void {
    this.getClassList();
  }

  getClassList(): void {
    this.signupService.getClassList().subscribe(
      (classes: ClassesList[]) => {
        this.classesList = classes;
      },
      (error) => {
        console.log('***error', error);
      }
    );
  }

  goToLoginPage(): void {
    this.router.navigate(['/']);
  }

  signUp() {
    this.authenticationService.SignUp(
      this.email,
      this.password,
      this.personType,
      this.bornDate,
      this.scholarYear,
      this.idClassSelected
    );
    this.email = '';
    this.password = '';
  }

  onItemChangePersonType(value: string): void {
    this.personType = value;
  }

  onItemChangeScholarYear(value: string): void {
    this.scholarYear = value;
  }

  onItemChangeClasses(value: number): void {
    this.idClassSelected = value;
  }
}
