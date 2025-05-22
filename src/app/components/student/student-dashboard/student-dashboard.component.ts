import { Component } from '@angular/core';
import { Exam } from '../../../models/exam';
import { ExamService } from '../../../services/exam.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";
import { FooterComponent } from "../../../shared/footer/footer.component";

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent {
  exams: Exam[] = [];

  constructor(private examService: ExamService) {}

  ngOnInit() {
    this.exams = this.examService.getAll();
  }
}
