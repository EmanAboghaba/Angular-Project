import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student-results',
  imports: [CommonModule],
  templateUrl: './student-results.component.html',
  styleUrl: './student-results.component.css'
})
export class StudentResultsComponent {
 results: {
    examId: number;
    totalQuestions: number;
    correctAnswers: number;
    percentage: number;
  }[] = [];

  constructor() {
    const stored = localStorage.getItem('studentResults');
    this.results = stored ? JSON.parse(stored) : [];
  }
}
