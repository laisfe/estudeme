import { Component, Inject, Input } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string = '';

  constructor(
    public authenticationService: AuthenticationService
  ) {}

  logout(): void {
    this.authenticationService.SignOut();
  }
}
