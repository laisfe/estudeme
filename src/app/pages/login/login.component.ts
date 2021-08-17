import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit(): void {
    // (window as any).fbAsyncInit = function () {
    //   FB.init({
    //     appId: '{your-app-id}',
    //     cookie: true,
    //     xfbml: true,
    //     version: '{api-version}',
    //   });
    //   FB.AppEvents.logPageView();
    // };
    // (function (d, s, id) {
    //   var js: any,
    //     fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) {
    //     return;
    //   }
    //   js = d.createElement(s);
    //   js.id = id;
    //   js.src = 'https://connect.facebook.net/en_US/sdk.js';
    //   fjs.parentNode.insertBefore(js, fjs);
    // })(document, 'script', 'facebook-jssdk');
    // console.log('aaaa')
    // if (!this.auth.appState$) {
      // this.router.navigate(['/students']);
      // console.log('***autentiquei', this.auth.appState$)
      console.log('***autentiquei', this.auth.isAuthenticated$)
      console.log('***token', this.auth.idTokenClaims$)
      console.log('***state', this.auth.appState$)
      // console.log('***autentiquei', this.auth.buildAuthorizeUrl(this.router.navigate(['/students'])))
    // }
  }

  goToStudentsHomePage(): void {
    this.router.navigate(['/students']);
  }

  goToSignUpPage(): void {
    this.router.navigate(['/signup']);
  }

  teste(): void {
    console.log('****teste', 'teste');
  }

  loginWithRedirect(): void {
    console.log('***auth', this.auth);
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
}
