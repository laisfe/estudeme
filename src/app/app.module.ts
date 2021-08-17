import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { StudentsComponent } from './pages/students/students.component';
import { ReportComponent } from './pages/report/report.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SideImageComponent } from './shared/components/side-image/side-image.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { GlobalVariable } from './shared/globals';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DocumentsComponent,
    StudentsComponent,
    ReportComponent,
    SettingsComponent,
    SidebarComponent,
    SideImageComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      ...env.auth,
    }),
  ],
  providers: [GlobalVariable, Document],
  bootstrap: [AppComponent]
})
export class AppModule { }
