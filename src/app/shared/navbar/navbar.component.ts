import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
<<<<<<< HEAD
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterLink],
})
export class NavbarComponent implements OnInit {
  studentEmail: string | null = null;
  @Output() toggleSidebar = new EventEmitter<void>();

  onToggleClick(): void {
    this.toggleSidebar.emit();
  }
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const email = localStorage.getItem('studentEmail');
    this.studentEmail = email && email !== 'undefined' ? email : null;
=======
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() toggleSidebar = new EventEmitter<void>();
  defaultImage = 'default-avatar.png';
  userData: any;
  subscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.authService.userData$.subscribe(data => {
      this.userData = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
>>>>>>> 18809237a6108975a5adee8efc9d152aaebb8344
  }

  onLogOut(): void {
    this.authService.logout();
  }
}
