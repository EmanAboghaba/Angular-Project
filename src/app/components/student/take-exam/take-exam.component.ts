import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../../services/exam.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Exam, Question } from '../../../models/exam';
import { Subscription } from 'rxjs'; // Import Subscription for better cleanup

import { CountdownComponent } from '../countdown/countdown.component';

@Component({
  selector: 'app-take-exam',
  standalone: true,
  imports: [CountdownComponent, CommonModule, FormsModule],
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css'],
})
export class TakeExamComponent implements OnInit, OnDestroy {
  exam!: Exam; // Use definite assignment assertion if you ensure it's loaded
  answers: { [questionId: number]: string } = {}; // Unified declaration
  timeLeft: number = 0; // Unified declaration
  timer: any; // Using timer for setInterval ID
  currentQuestionIndex = 0;
  submitted = false;
  score = 0;

  private examSubscription: Subscription | undefined; // For cleanup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    const examId = this.route.snapshot.paramMap.get('id');

    if (examId) {
      this.examSubscription = this.examService
        .getById(Number(examId))
        .subscribe({
          next: (examData) => {
            if (examData) {
              this.exam = examData;
              // Initialize answers for all questions (optional, but good practice)
              this.exam.questions.forEach((q) => (this.answers[q.id] = ''));
              this.timeLeft = this.exam.duration * 60; // Convert minutes to seconds
              this.startTimer();
            } else {
              alert('❌ Exam not found.');
              this.router.navigate(['/student/dashboard']);
            }
          },
          error: (err) => {
            console.error('Error loading exam:', err);
            alert('An error occurred while loading the exam.');
            this.router.navigate(['/student/dashboard']);
          },
        });
    } else {
      alert('❌ Invalid exam ID provided.');
      this.router.navigate(['/student/dashboard']);
    }
  }

  startTimer() {
    // Clear any existing timer to prevent multiple intervals
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.submitExam(); // Auto-submit when time runs out
      }
    }, 1000);
  }

  get currentQuestion(): Question {
    return this.exam.questions[this.currentQuestionIndex];
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.exam.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  submitExam(): void {
    if (this.submitted) {
      // Prevent double submission
      return;
    }
    clearInterval(this.timer); // Stop the timer
    this.score = this.calculateScore();
    this.submitted = true;
    this.saveResult();
    alert(`Exam submitted! Your score: ${this.score}%`); // Provide immediate feedback
  }

  calculateScore(): number {
    let totalScoreObtained = 0;
    let maximumPossibleScore = 0;

    this.exam.questions.forEach((question) => {
      maximumPossibleScore += question.score; // Sum up all possible scores

      // Check if the student's answer matches the correct answer's text
      if (this.answers[question.id] === question.correctAnswer) {
        totalScoreObtained += question.score; // Add question's score if correct
      }
    });

    // Calculate percentage based on total score obtained vs maximum possible
    if (maximumPossibleScore === 0) {
      return 0; // Avoid division by zero if there are no questions or scores
    }
    return Math.round((totalScoreObtained / maximumPossibleScore) * 100);
  }
  saveResult() {
    const results = JSON.parse(localStorage.getItem('examResults') || '[]');
    results.push({
      examId: this.exam.id,
      title: this.exam.title,
      score: this.score,
      date: new Date().toISOString(),
    });
    localStorage.setItem('examResults', JSON.stringify(results));
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.examSubscription?.unsubscribe(); // Unsubscribe from the exam service observable
  }

  goToDashboard(): void {
    this.router.navigate(['/student/dashboard']);
  }

  goToResults(): void {
    this.router.navigate(['/student/results']);
  }
}