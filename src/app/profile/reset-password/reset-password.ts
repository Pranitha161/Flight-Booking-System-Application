import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../services/user'; 

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.html',
  styleUrl:'./reset-password.css'
})
export class ResetPassword implements OnInit {
  token = '';
  newPassword = '';
  confirmPassword = '';
  message: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private userService: User) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    if (!this.token) {
      this.message = 'Missing reset token';
    }
  }

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Passwords do not match';
      return;
    }
    this.userService.resetPassword(this.token, this.newPassword).subscribe({
      next: () => {
        this.message = 'Password reset successful. Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => this.message = err.error?.message || 'Error resetting password'
    });
  }
}
