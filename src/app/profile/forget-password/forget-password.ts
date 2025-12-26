import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../services/user';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forget-password.html',
  styleUrl:'./forget-password.css'
})
export class ForgotPassword {
  email = '';
  message: string | null = null;

  constructor(private userService: User,private cd:ChangeDetectorRef) {}

  onSubmit() {
    if (!this.email) {
      this.message = 'Please enter your email';
      return;
    }
    this.userService.requestPasswordReset(this.email).subscribe({
      next: () =>{ this.message = 'Reset link sent to your email';
        this.cd.detectChanges();
      },
      error: (err) => {this.message = err.error?.message || 'Error sending reset link';
        this.cd.detectChanges();
        console.log(err);
      }
      
    });
  }
}
