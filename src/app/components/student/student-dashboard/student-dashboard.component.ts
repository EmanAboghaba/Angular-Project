import { Component, OnInit } from '@angular/core';
import { Exam } from '../../../models/exam';
import { ExamService } from '../../../services/exam.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent implements OnInit {
  exams: Exam[] = [];

  constructor(private examService: ExamService) {}
  private examsSubscription: Subscription | undefined;
  ngOnInit(): void {
    this.examsSubscription = this.examService.getAll().subscribe({
      next: (data: Exam[]) => {
        this.exams = data;
        console.log('Exams successfully fetched and displayed:', this.exams);
      },
      error: (err: HttpErrorResponse | Error) => {
        console.error('Error fetching exams for list:', err);
      },
    });
  }
}
