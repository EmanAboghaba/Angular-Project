import { Routes } from '@angular/router';
import { ExamListComponent } from './components/exam-list.component';
import { ExamFormComponent } from './components/exam-form.component';

export const routes: Routes = [
  { path: '', component: ExamListComponent },
  { path: 'add-exam', component: ExamFormComponent },
  { path: 'edit-exam/:id', component: ExamFormComponent },
];
