export interface Choice {
  id: number;
  text: string;
}

export interface Question {
  id: number;
  examId: number;
  text: string;
  choices: Choice[];
  correctAnswerId: number;
}
