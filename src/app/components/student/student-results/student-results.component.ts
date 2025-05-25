import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-results',
  imports: [CommonModule,RouterLink],
  templateUrl: './student-results.component.html',
  styleUrl: './student-results.component.css'
})
export class StudentResultsComponent {
  results = this.getResults();

  getResults() {
    const storedResults = localStorage.getItem('examResults');
    return storedResults ? JSON.parse(storedResults) : [];
  }

  getResultClass(score: number): string {
    if (score >= 80) return 'excellent';
    if (score >= 50) return 'good';
    return 'poor';
  }
}
