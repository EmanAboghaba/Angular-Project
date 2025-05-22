import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class NavbarComponent implements OnInit {
  studentEmail: string | null = null;
@Output() toggleSidebar = new EventEmitter<void>();

onToggleClick(): void {
  this.toggleSidebar.emit();
}
 constructor(private router: Router,private authService: AuthService) {}

 ngOnInit(): void {
  const email = localStorage.getItem('studentEmail');
  this.studentEmail = email && email !== 'undefined' ? email : null;
}

  
 onLogOut(): void {
    this.authService.logout();
  }
}
