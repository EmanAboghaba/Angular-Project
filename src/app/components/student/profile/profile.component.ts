import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileForm: FormGroup;
  isEditMode = false;
  previewImage: string | ArrayBuffer | null = null;
  defaultImage = 'default-avatar.png';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    const user = this.authService.getUserData();

    this.profileForm = this.fb.group({
      firstName: [user?.name?.split(' ')[0] || '', Validators.required],
      lastName: [user?.name?.split(' ')[1] || '', Validators.required],
      email: [user?.email || '', [Validators.required, Validators.email]],
      major: [user?.major || '', Validators.required],
    });

    this.profileForm.disable();
  }

  toggleEdit() {
    this.isEditMode = !this.isEditMode;
    this.isEditMode ? this.profileForm.enable() : this.profileForm.disable();
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const userData = {
        ...this.authService.getUserData(),
        name: `${this.profileForm.value.firstName} ${this.profileForm.value.lastName}`,
        email: this.profileForm.value.email,
        major: this.profileForm.value.major,
        image: this.previewImage
      };

      this.authService.login(userData);
      this.toggleEdit();
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
