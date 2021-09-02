import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/database';
import {
  StudentRegistration,
  TeacherRegistration,
} from '../models/registration';
import { SignupService } from 'src/app/services/signup.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: Observable<firebase.User>;
  public studentRegistration: StudentRegistration;
  public teacherRegistration: TeacherRegistration;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private signupService: SignupService
  ) {
    this.userData = angularFireAuth.authState;
  }

  /* Sign up */
  SignUp(
    email: string,
    password: string,
    personType: string,
    bornDate: Date,
    scholarYear: number,
    idTurma: number,
    idInstituicao: number,
    nome: string,
    idDisciplina: number
  ) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('Successfully signed up!', res);
        // firebase
        //   .database()
        //   .ref('users/' + res.user.uid)
        //   .set({
        //     uid: res.user.uid,
        //     email: email,
        //     personType: personType,
        //     bornDate: bornDate,
        //     scholarYear: scholarYear,
        //     idTurma: idTurma,
        //     idInstituicao: idInstituicao,
        //     nome: nome,
        //   });
        // var starCountRef = firebase.database().ref('users/' + res.user.uid);
        // starCountRef.on('value', (snapshot) => {
        //   const data = snapshot.val();
        //   console.log('data', data);
        // });
        if (personType === 'aluno') {
          this.studentRegistration = {
            nome: nome,
            ano: scholarYear,
            nascimento: bornDate,
            idIns: idInstituicao,
            idTurma: idTurma,
            email: email,
          };
          this.signupService.putNewStudent(this.studentRegistration).subscribe(
            () => {},
            (error) => {
              console.log('error', error);
            }
          );
        } else {
          this.teacherRegistration = {
            nome: nome,
            idInstituicao: idInstituicao,
            idDisciplina: idDisciplina,
            email: email,
          };
          this.signupService.putNewTeacher(this.teacherRegistration).subscribe(
            () => {},
            (error) => {
              console.log('error');
            }
          );
        }
        this.router.navigate(['/students']);
      })
      .catch((error) => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('Successfully signed in!', res);
        this.router.navigate(['/students']);
        var starCountRef = firebase.database().ref('users/' + res.user.uid);
        starCountRef.on('value', (snapshot) => {
          const data = snapshot.val();
          console.log('data', data);
        });
      })
      .catch((err) => {
        console.log('Something is wrong:', err.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth.signOut();
    this.router.navigate(['/']);
  }
}
