import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExamService } from '../services/exam.service';
import { Exam } from '../models/exam';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="margin: 3rem;  text-align:center;">
      <button
        [routerLink]="['/add-exam']"
        style="padding: 0.5rem 1rem; background-color: #007bff; color: white; border: none; border-radius: 4px;"
      >
        ➕ Add New Exam
      </button>
    </div>
    <ul style="list-style: none; padding: 0;">
      @for (exam of exams; track exam.id) {
      <li
        style="background: #f9f9f9; padding: 1rem; margin-bottom: 0.5rem; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;"
      >
        <div>
          <strong>{{ exam.title }}</strong
          ><br />
          <small>{{ exam.description }}</small>
        </div>

        <div>
          <button
            [routerLink]="['/edit-exam', exam.id]"
            style="margin-right: 0.5rem; padding: 0.3rem 0.8rem; background: #ffc107; border: none; border-radius: 4px;"
          >
            ✏️ Edit
          </button>

          <button
            (click)="deleteExam(exam.id)"
            style="padding: 0.3rem 0.8rem; background: #dc3545; color: white; border: none; border-radius: 4px;"
          >
            🗑️ Delete
          </button>
        </div>
      </li>
      }
    </ul>
  `,
})
export class ExamListComponent {
  exams: Exam[] = [];

  constructor(private examService: ExamService) {
    this.exams = this.examService.getAll();
  }

  deleteExam(id: number) {
    this.examService.delete(id);
    this.exams = this.examService.getAll();
  }
}
