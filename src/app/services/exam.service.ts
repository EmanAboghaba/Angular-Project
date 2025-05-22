import { Injectable } from '@angular/core';
import { Exam } from '../models/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private storageKey = 'exams';

  getAll(): Exam[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  getById(id: number): Exam | undefined {
    return this.getAll().find(e => e.id === id);
  }

  add(exam: Exam): void {
    const exams = this.getAll();
    exam.id = new Date().getTime(); 
    exams.push(exam);
    this.saveAll(exams);
  }

  update(id: number, updated: Exam): void {
    let exams = this.getAll().map(e => (e.id === id ? updated : e));
    this.saveAll(exams);
  }

  delete(id: number): void {
    let exams = this.getAll().filter(e => e.id !== id);
    this.saveAll(exams);
  }

  private saveAll(exams: Exam[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(exams));
  }
}
