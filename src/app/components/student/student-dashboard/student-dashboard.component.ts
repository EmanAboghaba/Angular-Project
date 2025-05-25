import { Component, OnInit } from '@angular/core';
import { Exam } from '../../../models/exam';
import { ExamService } from '../../../services/exam.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
=======
import { NavbarComponent } from "../../../shared/navbar/navbar.component";
import { FooterComponent } from "../../../shared/footer/footer.component";
import { ExamCardComponent } from '../exam-card/exam-card.component';
>>>>>>> 18809237a6108975a5adee8efc9d152aaebb8344

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, RouterLink],
=======
  imports: [ExamCardComponent,CommonModule, RouterLink, NavbarComponent, FooterComponent],
>>>>>>> 18809237a6108975a5adee8efc9d152aaebb8344
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent implements OnInit {
  exams: Exam[] = [];

  constructor(private examService: ExamService) {}
<<<<<<< HEAD
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
=======

  ngOnInit(): void {
    this.exams = this.examService.getAll();
>>>>>>> 18809237a6108975a5adee8efc9d152aaebb8344
  }
}
