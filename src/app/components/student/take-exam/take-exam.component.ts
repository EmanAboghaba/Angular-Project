import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../../services/exam.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Exam } from '../../../models/exam';
import { Question } from '../../../models/question';
import { CountdownComponent } from '../countdown/countdown.component';

@Component({
  selector: 'app-take-exam',
  standalone: true,
  imports: [CountdownComponent,CommonModule, FormsModule],
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css']
})
export class TakeExamComponent implements OnInit, OnDestroy {
  exam!: Exam;
  currentQuestionIndex = 0;
  answers: { [questionId: number]: number } = {};
  submitted = false;
  score = 0;
  timeLeft = 0;
  timer: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService
  ) {}

  ngOnInit() {
    const examId = this.route.snapshot.paramMap.get('id');
    const exam = this.examService.getById(Number(examId));
    
    if (exam) {
      this.exam = exam;
      this.timeLeft = exam.duration * 60;
      this.startTimer();
    } else {
      this.router.navigate(['/student/dashboard']);
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.submitExam();
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

  submitExam() {
    clearInterval(this.timer);
    this.score = this.calculateScore();
    this.submitted = true;
    this.saveResult();
  }

  calculateScore(): number {
    let correctAnswers = 0;
    
    this.exam.questions.forEach(question => {
      if (this.answers[question.id] === question.correctAnswerId) {
        correctAnswers++;
      }
    });
    
    return Math.round((correctAnswers / this.exam.questions.length) * 100);
  }

  saveResult() {
    const results = JSON.parse(localStorage.getItem('examResults') || '[]');
    results.push({
      examId: this.exam.id,
      title: this.exam.title,
      score: this.score,
      date: new Date().toISOString()
    });
    localStorage.setItem('examResults', JSON.stringify(results));
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
    goToDashboard() {
    this.router.navigate(['/student/dashboard']);
  }

  goToResults() {
    this.router.navigate(['/student/results']);
  }

}
