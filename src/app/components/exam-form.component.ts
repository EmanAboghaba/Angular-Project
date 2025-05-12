import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExamService } from '../services/exam.service';
import { Exam } from '../models/exam';

@Component({
  selector: 'app-exam-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container alert alert-light text-align-center">
      <h2 style="margin: 1rem;">
        {{ isEdit ? '✏️ Edit Exam' : '➕ Add Exam' }}
      </h2>
      <form
        (ngSubmit)="save()"
        style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;"
      >
        <input
          [(ngModel)]="exam.title"
          name="title"
          placeholder="Title"
          required
          style="padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc;"
        />
        <input
          [(ngModel)]="exam.description"
          name="description"
          placeholder="Description"
          required
          rows="3"
          style="padding: 0.5rem; border-radius: 4px; border: 1px solid #ccc;"
        />
        <input type="date" [(ngModel)]="exam.date" name="date" required />
        <input
          type="number"
          [(ngModel)]="exam.duration"
          name="duration"
          placeholder="Duration (minutes)"
          required
        />

        <h3>Questions</h3>
        @for (q of exam.questions; track $index) {
        <div
          style="border: 1px solid #ccc; padding: 1rem; margin-bottom: 1rem;"
        >
          <input
            [(ngModel)]="q.text"
            name="text{{ $index }}"
            placeholder="Question Text"
            required
          />
          <h4>Choices</h4>
          <div
            *ngFor="let choice of q.choices; let j = index"
            style="display: flex; gap: 0.5rem; align-items: center;"
          >
            <input
              [(ngModel)]="q.choices[j].text"
              name="choiceText{{ $index }}{{ j }}"
              placeholder="Choice {{ j + 1 }}"
              required
            />
            <input
              type="radio"
              name="correctAnswer{{ $index }}"
              [value]="choice.id"
              [(ngModel)]="q.correctAnswerId"
              title="Mark as correct"
            />
          </div>
          <button type="button" (click)="removeQuestion($index)">
            🗑 Remove Question
          </button>
        </div>
        }

        <button type="button" (click)="addQuestion()">➕ Add Question</button>
        <button
          type="submit"
          style="padding: 0.5rem 1rem; background: #28a745; color: white; border: none; border-radius: 4px; width: fit-content;"
        >
          💾 {{ isEdit ? 'Update' : 'Save' }}
        </button>
      </form>
    </div>
  `,
})
export class ExamFormComponent {
  exam: Exam = {
    id: 0,
    title: '',
    description: '',
    questions: [],
    date: '',
    duration: 0,
  };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService
  ) {
    const id = this.route.snapshot.params['id'];
    if (id) {
      const existing = this.examService.getById(+id);
      if (existing) {
        this.exam = { ...existing };
        this.isEdit = true;
      }
    }
  }

  save() {
    const invalid = this.exam.questions.find(
      (q) => !q.choices.some((c) => c.id === q.correctAnswerId)
    );
    if (invalid) {
      alert('Each question must have a valid correct answer selected.');
      return;
    }
    if (this.isEdit) {
      this.examService.update(this.exam.id, this.exam);
    } else {
      this.examService.add(this.exam);
    }
    this.router.navigate(['/']);
  }
  addQuestion() {
    const newId = this.exam.questions.length + 1;
    this.exam.questions.push({
      id: newId,
      examId: this.exam.id,
      text: '',
      choices: [
        { id: 1, text: '' },
        { id: 2, text: '' },
        { id: 3, text: '' },
        { id: 4, text: '' },
      ],
      correctAnswerId: 0,
    });
  }

  removeQuestion(index: number) {
    this.exam.questions.splice(index, 1);
  }
}
