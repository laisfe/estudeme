import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassesList } from './models/classes';
import { SignupService } from './signup.service';
import { AuthenticationService } from 'src/app/shared/authentication/authentication.service';
import { SchoolsList } from './models/schools';
import { Subject } from './models/subject';
import { GlobalVariable } from 'src/app/shared/globals';
import firebase from 'firebase/app';
import 'firebase/auth';
import { environment } from 'src/environments/environment';

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
  scholarYear: number;
  classesList: ClassesList[];
  idTurma: number;
  schoolsList: SchoolsList[];
  idInstituicao: number;
  nome: string;
  idDisciplina: number;
  subjectList: Subject[];
  class: ClassesList;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private signupService: SignupService,
    public globalVariable: GlobalVariable
  ) {}

  ngOnInit(): void {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(environment.firebase);
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        var starCountRef = firebase.database().ref('users/' + user.uid);
        starCountRef.on('value', (snapshot) => {
          const data = snapshot.val();
          this.globalVariable.personType = data.personType;
        });
        if (this.globalVariable.personType === 'professor') {
          this.router.navigate(['/students']);
        } else {
          this.router.navigate(['/documents']);
        }
      } else {
        // User is signed out
        this.router.navigate(['/signup']);
      }
    });

    this.getClassList();
    this.getSchoolsList();
    this.getSubjectList();
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

  getClassListById(scholarYear: number): void {
    this.signupService.getClassListById(scholarYear).subscribe(
      (classe: ClassesList) => {
        this.class = classe;
      },
      (error) => {
        console.log('***error', error);
      }
    );
  }

  getSchoolsList(): void {
    this.signupService.getSchoolsList().subscribe(
      (schools: SchoolsList[]) => {
        console.log('schools', schools);
        this.schoolsList = schools;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  getSubjectList(): void {
    this.signupService.getSubjectList().subscribe(
      (subject: Subject[]) => {
        this.subjectList = subject;
      },
      (error) => {
        console.log('error', error);
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
      this.idTurma,
      this.idInstituicao,
      this.nome,
      this.idDisciplina
    );
    this.email = '';
    this.password = '';
    const data = {};
  }

  onItemChangePersonType(value: string): void {
    this.personType = value;
    this.scholarYear = null;
    this.idTurma = null;
    this.idInstituicao = null;
    this.idDisciplina = null;
  }

  onItemChangeScholarYear(value: string): void {
    this.scholarYear = Number(value);
    this.getClassListById(this.scholarYear);
  }

  onItemChangeClasses(value: number): void {
    this.idTurma = value;
  }

  onItemChangeSchools(value: number): void {
    this.idInstituicao = value;
  }

  onItemChangeSubjects(value: number): void {
    this.idDisciplina = value;
  }
}
