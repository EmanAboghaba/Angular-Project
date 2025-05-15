import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../../services/exam.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Exam } from '../../../models/exam';

@Component({
  selector: 'app-take-exam',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css']
})
export class TakeExamComponent implements OnInit, OnDestroy {
  exam!: Exam;
  answers: { [questionId: number]: number } = {};
  timeLeft: number = 0;
  intervalId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    const exam = this.examService.getById(id);
    if (exam && exam.duration && exam.duration > 0) {
      this.exam = exam;
      this.timeLeft = exam.duration * 60;
      this.startTimer();
    } else {
      alert('❌ Exam not found or invalid duration');
      this.router.navigate(['/student']);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startTimer(): void {
    this.intervalId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.intervalId);
        alert('⏰ Time is up! Submitting your exam.');
        this.submitExam();
      }
    }, 1000);
  }

  submitExam(): void {
    clearInterval(this.intervalId);

    let correctCount = 0;
    for (const q of this.exam.questions) {
      if (this.answers[q.id] === q.correctAnswerId) {
        correctCount++;
      }
    }

    const result = {
      examId: this.exam.id,
      totalQuestions: this.exam.questions.length,
      correctAnswers: correctCount,
      percentage: Math.round((correctCount / this.exam.questions.length) * 100),
    };

    const results = JSON.parse(localStorage.getItem('studentResults') || '[]');
    results.push(result);
    localStorage.setItem('studentResults', JSON.stringify(results));

    alert(`✅ Exam submitted! You scored ${result.correctAnswers}/${result.totalQuestions}`);
    this.router.navigate(['/student/results']);
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
