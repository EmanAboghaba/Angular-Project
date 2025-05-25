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
  defaultImage = 'default-avatar.png';
  previewImage: string | null = null;
  profileForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    const userData = this.authService.getUserData();
    
    this.previewImage = userData?.image || this.defaultImage;
    
   this.profileForm = this.fb.group({
  name: [userData?.name || '', Validators.required],
  email: [userData?.email || '', [Validators.required, Validators.email]],
  major: [userData?.major || '', Validators.required]
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
  name: this.profileForm.value.name,
  email: this.profileForm.value.email,
  major: this.profileForm.value.major,
  image: this.previewImage
};

this.authService.login(userData);

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
