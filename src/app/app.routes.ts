import { Routes } from '@angular/router';
import { ExamListComponent } from './components/exam-list.component';
import { ExamFormComponent } from './components/exam-form.component';
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';

export const routes: Routes = [
  // ✅ خلي Account في /account عشان الروابط تبقى واضحة ومنطقية
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
  { path: 'edit-exam/:id', component: ExamFormComponent }
];
