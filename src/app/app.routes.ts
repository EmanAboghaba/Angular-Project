import { Routes } from '@angular/router';
import { ExamListComponent } from './components/exam-list.component';
import { ExamFormComponent } from './components/exam-form.component';
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { StudentDashboardComponent } from './components/student/student-dashboard/student-dashboard.component';
import { StudentResultsComponent } from './components/student/student-results/student-results.component';
import { TakeExamComponent } from './components/student/take-exam/take-exam.component';

export const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  { path: '', redirectTo: 'account', pathMatch: 'full' },

  { path: 'examlist', component: ExamListComponent },
  { path: 'add-exam', component: ExamFormComponent },
  { path: 'edit-exam/:id', component: ExamFormComponent },

  {
    path: 'student',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',component:StudentDashboardComponent  },
      { path: 'exam/:id', component:TakeExamComponent  },
      { path: 'results',component: StudentResultsComponent}
    ]
  }
];
