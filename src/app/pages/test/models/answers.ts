export interface AnswersList {
  idQuestao: string;
  respostaCorreta: string;
  respostaRecebida: string;
  tempoDecorrido: string;
}

export interface Avaliation {
  idAvaliacao?: string;
  respostas: AnswersList[];
  data: Date;
  qtdQuestoes: number;
  idProva: string;
  idAluno: number;
  idTurma: number;
  idDisciplina?: number;
  idProfessor?: number;
}
