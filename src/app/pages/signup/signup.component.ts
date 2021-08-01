import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToLoginPage(): void {
    this.router.navigate(['/']);
  }

  goToStudentsHomePage(): void {
    this.router.navigate(['/students']);
  }
}
