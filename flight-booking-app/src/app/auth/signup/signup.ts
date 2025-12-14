import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Auth } from '../auth';
@Component({
  selector: 'app-signup',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
    email='';
    username='';
    password='';
    age:number|null=null;
    gender='';
    errorMessage='';
    successMessage='';
    role='USER'
     constructor(private auth:Auth,private router: Router){}
    signup(){
      console.log("signup clicled");
      const body={
        username:this.username,
        email:this.email,
        password:this.password,
        age:this.age,
        gender:this.gender,
        role:this.role

      };
      console.log(body);
      this.auth.signup(body).subscribe({
    next: (response) => {
      console.log(response);
      this.successMessage = "Account created successfully";

      // Redirect after a short delay (optional)
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);
    },
   error: (err) => {
  console.log("Full error object:", err);
  console.log("Backend error JSON:", err.error);

  this.errorMessage = err.error?.message || "Signup failed";
}

  });
    }
}
