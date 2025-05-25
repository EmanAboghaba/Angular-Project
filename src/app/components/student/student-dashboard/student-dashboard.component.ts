import { Component, OnInit } from '@angular/core';
import { Exam } from '../../../models/exam';
import { ExamService } from '../../../services/exam.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";
import { FooterComponent } from "../../../shared/footer/footer.component";
import { ExamCardComponent } from '../exam-card/exam-card.component';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [ExamCardComponent,CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  exams: Exam[] = [];

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.exams = this.examService.getAll();
  }
}
