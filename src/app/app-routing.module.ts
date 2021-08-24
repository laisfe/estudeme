import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './pages/documents/documents.component';
import { LoginComponent } from './pages/login/login.component';
import { ReportComponent } from './pages/report/report.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StudentsComponent } from './pages/students/students.component';
import { TestComponent } from './pages/test/test.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'documents', component: DocumentsComponent },
  { path: 'reports', component: ReportComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'test', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
