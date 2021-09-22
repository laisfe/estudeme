import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { environment } from '../environments/environment';
import { TestComponent } from './pages/test/test.component';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { NewActivityComponent } from './pages/new-activity/new-activity.component';

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
    HeaderComponent,
    TestComponent,
    NewActivityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circle,
        backdropBackgroundColour: 'rgba(0,0,0,0.1)',
        primaryColour: '#32cc3f', 
        secondaryColour: '#5de26866', 
    }),
  ],
  exports: [AngularFirestoreModule],
  providers: [GlobalVariable, Document],

  bootstrap: [AppComponent],
})
export class AppModule {}
