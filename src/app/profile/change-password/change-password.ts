import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from '../../services/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
  oldPassword = '';
  newPassword = '';

  message: string | null = null;
  constructor(private userService: User, private router: Router, private cd: ChangeDetectorRef) { }
  goToProfile() { this.router.navigate(['/profile']); }
  onSubmit(form: any) {
    
    if(this.newPassword=== this.oldPassword){
      this.message="New password cannot be the same as current password"
      this.cd.detectChanges();
      return;
    }
    if (this.newPassword.length < 12) {
      this.message = "Password must be at least 12 characters long";
      this.cd.detectChanges();
      return;
    }

    const hasUpper = /[A-Z]/.test(this.newPassword);
    const hasLower = /[a-z]/.test(this.newPassword);
    const hasDigit = /\d/.test(this.newPassword);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(this.newPassword);
    if (!(hasUpper && hasLower && hasDigit && hasSpecial)) {
      this.message = "Password must include uppercase, lowercase, number, and special character";
      this.cd.detectChanges();
      return;
    }
    const username = localStorage.getItem("username") || "";
    
    if (this.oldPassword != this.newPassword) {
      this.userService.changePassword(username,this.oldPassword, this.newPassword).subscribe({
        next: (res: any) => {
          this.message = res.message + " " + "Need to login again";
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          this.cd.detectChanges();
          setTimeout(() => { this.router.navigate(['/login']); }, 1500);
        }, error: (err: any) => {
          this.message = err.error.message || "Error changing password";
          this.cd.detectChanges();

        }
      });
    }
  }
}
