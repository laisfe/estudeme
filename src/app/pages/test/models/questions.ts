export interface Test {
  idProva: string;
  idProfessor: number;
  questoes: QuestionsList[];
  idAluno: number;
  idTurma: number;
}

export interface QuestionsList {
  idQuestao: string;
  enunciado: string;
  ano: number;
  respostaCorreta: string;
  fonte: string;
  urlImagem: string;
  alternativas: AlternativesList;
  idDisciplina: number;
  idCompetencia: number;
  idHabilidade: number;
}

export interface AlternativesList {
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
}
