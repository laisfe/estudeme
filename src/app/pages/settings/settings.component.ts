import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { finalize } from 'rxjs/operators';
import { GlobalVariable } from 'src/app/shared/globals';
import { StudentsList } from 'src/app/shared/models/students-types';
import { TeachersList } from 'src/app/shared/models/teachers';
import { StudentsService } from 'src/app/shared/services/students.service';
import { TeacherService } from 'src/app/shared/services/teacher.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  loading: boolean = false;
  inputEmail: string;
  inputNewEmail: string;
  inputPassword: string;
  userEmail: string;
  userUid: string;
  correctEmail: boolean = false;
  studentData: StudentsList;
  newStudentData: StudentsList;
  user;
  inputNewPassword: string;
  teacherData: TeachersList;
  newTeacherData: TeachersList;

  constructor(
    private studentsService: StudentsService,
    private globalVariable: GlobalVariable,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        console.log('user', user);
      }
    });
    this.globalVariable.personType;
  }

  verifyEmail(): void {
    this.loading = true;
    if (this.globalVariable.personType === 'aluno') {
      this.studentsService
        .getStudentsList()
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(
          (students: StudentsList[]) => {
            students.every((element) => {
              if (element.email === this.inputEmail) {
                this.studentData = element;
                this.correctEmail = true;
                return false;
              }
              return true;
            });
          },
          (error) => {
            console.log('error', error);
          }
        );
    } else {
      this.teacherService
        .getTeachersList()
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe(
          (teachers: TeachersList[]) => {
            teachers.every((element) => {
              if (element.email === this.inputEmail) {
                this.teacherData = element;
                this.correctEmail = true;
                return false;
              }
              return true;
            });
          },
          (error) => {
            console.log('error', error);
          }
        );
    }
  }

  changeEmail(): void {
    if (this.globalVariable.personType === 'aluno') {
      this.newStudentData = {
        idAluno: this.studentData.idAluno,
        nome: this.studentData.nome,
        ano: this.studentData.ano,
        nascimento: this.studentData.nascimento,
        idIns: this.studentData.idIns,
        idTurma: this.studentData.idTurma,
        email: this.inputNewEmail,
        uid: this.studentData.uid,
        fezProvaInicial: this.studentData.fezProvaInicial,
      };

      var cred = firebase.auth.EmailAuthProvider.credential(
        this.user.email,
        this.inputPassword
      );
      this.user.reauthenticateWithCredential(cred).then(() => {});

      this.user.updateEmail(this.inputNewEmail).then(
        () => {
          this.studentsService
            .putStudentsList(this.newStudentData, this.studentData.idAluno)
            .pipe(
              finalize(() => {
                this.inputEmail = '';
                this.inputPassword = '';
                this.inputNewEmail = '';
                this.inputNewPassword = '';
              })
            )
            .subscribe(
              () => {},
              (error) => {
                console.log('error', error);
              }
            );
        },
        (error) => {
          console.log('error', error);
        }
      );
    } else {
      this.newTeacherData = {
        idProfessor: this.teacherData.idProfessor,
        nome: this.teacherData.nome,
        idInstituicao: this.teacherData.idInstituicao,
        idDisciplina: this.teacherData.idDisciplina,
        email: this.inputNewEmail,
        uid: this.teacherData.uid,
      };

      var cred = firebase.auth.EmailAuthProvider.credential(
        this.user.email,
        this.inputPassword
      );
      this.user.reauthenticateWithCredential(cred).then(() => {});

      this.user.updateEmail(this.inputNewEmail).then(
        () => {
          this.teacherService
            .putTeacher(this.newTeacherData, this.teacherData.idProfessor)
            .pipe(
              finalize(() => {
                this.inputEmail = '';
                this.inputPassword = '';
                this.inputNewEmail = '';
                this.inputNewPassword = '';
              })
            )
            .subscribe(
              () => {},
              (error) => {
                console.log('error', error);
              }
            );
        },
        (error) => {
          console.log('error', error);
        }
      );
    }
  }

  changePassword(): void {
    var cred = firebase.auth.EmailAuthProvider.credential(
      this.user.email,
      this.inputPassword
    );
    this.user.reauthenticateWithCredential(cred).then(() => {});

    this.user.updatePassword(this.inputNewPassword).then(
      () => {},
      (error) => {
        console.log('error', error);
      }
    );
  }
}
