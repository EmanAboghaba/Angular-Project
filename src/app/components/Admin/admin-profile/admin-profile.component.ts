// src/app/components/Admin/admin-profile/admin-profile.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // For ngModel
import { UserService } from './../../../services/user.service'; // Adjust path
import { User } from './../../../models/user'; // Adjust path
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit, OnDestroy {
  adminUser: User | null = null;
  editMode: boolean = false;
  editedEmail: string = '';
  // Add other fields you might want to edit (e.g., username)

  successMessage: string | null = null;
  errorMessage: string | null = null;

  private userSubscription: Subscription | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadAdminProfile();
  }

  loadAdminProfile(): void {
    this.userSubscription = this.userService.getAdminProfile().subscribe({
      next: (user: User) => {
        this.adminUser = user;
        this.editedEmail = user.email; // Initialize editedEmail with current email
        this.successMessage = null; // Clear messages on load
        this.errorMessage = null;
      },
      error: (err) => {
        console.error('Failed to load admin profile:', err);
        this.errorMessage = 'Failed to load profile. Please try again.';
        this.successMessage = null;
        this.adminUser = null; // Clear user data if error occurs
      },
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode && this.adminUser) {
      this.editedEmail = this.adminUser.email; // Reset edited email if entering edit mode
    }
    this.successMessage = null;
    this.errorMessage = null;
  }

  saveProfile(): void {
    if (!this.adminUser) {
      this.errorMessage = 'No admin user data to save.';
      return;
    }

    if (this.editedEmail.trim() === '') {
      this.errorMessage = 'Email cannot be empty.';
      return;
    }

    // You might add more validation here (e.g., email format)

    this.userService.updateAdminProfile({ email: this.editedEmail }).subscribe({
      next: (updatedUser: User) => {
        this.adminUser = updatedUser; // Update the component's user data
        this.editMode = false; // Exit edit mode
        this.successMessage = 'Profile updated successfully!';
        this.errorMessage = null;
      },
      error: (err) => {
        console.error('Failed to save profile:', err);
        this.errorMessage = 'Failed to update profile. ' + err.message;
        this.successMessage = null;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
