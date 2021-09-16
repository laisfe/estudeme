export interface StudentRegistration {
  idAluno?: number;
  nome: string;
  ano: number;
  nascimento: Date;
  idIns: number;
  idTurma: number;
  email: string;
  uid: string;
}

export interface TeacherRegistration {
  idProfessor?: number;
  nome: string;
  idInstituicao: number;
  idDisciplina: number;
  email: string;
  uid: string;
}
