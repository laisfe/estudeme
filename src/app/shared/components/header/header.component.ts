import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string = '';

  constructor(
    public auth: AuthService,

    @Inject(DOCUMENT)
    private doc: Document
  ) {}

  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
}
