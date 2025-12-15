import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { Auth } from '../auth';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  email = '';
  username = '';
  password = '';
  age: number | null = null;
  gender = '';
  errorMessage = '';
  successMessage = '';
  role = 'USER'
  constructor(private auth: Auth, private router: Router) { }
  selectRole(role: string) {
    this.role = role;
  }
  signup() {
    const body = {
      username: this.username,
      email: this.email,
      password: this.password,
      age: this.age,
      gender: this.gender,
      role: this.role

    };
    this.auth.signup(body).subscribe({
      next: (response) => {
        this.errorMessage="",
        this.successMessage = "Account created successfully";

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
  this.errorMessage = err.error?.message || "Login failed";
  
}


    });
  }
}
