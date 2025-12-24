import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../auth';
import { Router, RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
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
  constructor(private auth: Auth, private router: Router, private cd: ChangeDetectorRef) { }

  login() {
    this.errorMessage = "";
    console.log("login clicked");
    const body = {
      username: this.username,
      password: this.password,

    };
    this.auth.login(body).subscribe({
      next: (res) => {
        localStorage.setItem("username", this.username);
         if (res.message==="PASSWORD_EXPIRED")
          { 
            this.errorMessage = "Your password has expired. Please change it to continue."; 
            this.cd.detectChanges(); 
            setTimeout(() => { this.router.navigate(['/change-password']); }, 2000); 
            return; 
          }
        this.auth.saveToken(res.message);
        localStorage.setItem("username", this.username);
       
        const role = this.auth.getUserRole();
        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.error("Login error:", err);
        this.errorMessage = err.error?.message || "Login failed"; 
        this.cd.detectChanges();
      }

    });


  };

}
