import { Question } from './question';

export interface Exam {
  id: number;
  title: string;
  description: string;
  date: string;
  duration: number;
  questions: Question[];
}
