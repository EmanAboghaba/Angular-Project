import { Injectable } from '@angular/core';
import { Exam } from '../models/exam';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private exams: Exam[] = [];

  getAll(): Exam[] {
    return [...this.exams];
  }

  getById(id: number): Exam | undefined {
    return this.exams.find((e) => e.id === id);
  }

  add(exam: Exam) {
    this.exams.push({ ...exam, id: Date.now() });
  }

  update(id: number, updatedExam: Exam) {
    const index = this.exams.findIndex((e) => e.id === id);
    if (index !== -1) {
      this.exams[index] = { ...updatedExam, id };
    }
  }

  delete(id: number) {
    this.exams = this.exams.filter((e) => e.id !== id);
  }
}
