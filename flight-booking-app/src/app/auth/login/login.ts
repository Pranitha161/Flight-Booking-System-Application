import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, CommonModule, RouterLink
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = ''
  password = ''
  errorMessage = ''
  successMessage = ''
  constructor(private auth: Auth, private router: Router) { }

  login() {
    console.log("login clicked");
    const body = {
      username: this.username,
      password: this.password,

    };
    this.auth.login(body).subscribe({
      next: (res) => {
        const role = this.auth.getUserRole();
        this.auth.saveToken(res.message);
        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/flights']);
        }
      },
      error: (err) => {
        console.error("Login error:", err);
      }
    });


  };

}
