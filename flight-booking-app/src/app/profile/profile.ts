import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../services/user';
import { Auth } from '../auth/auth'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {

  user: any = {
    id: '',
    email: '',
    username: '',
    role: ''
  };
  errorMessage='';
  constructor(private userService: User,private auth:Auth, private cd: ChangeDetectorRef,private router:Router) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe((res: any) => {

      this.user = res;
      this.cd.detectChanges();
    });
  }
  editMode = false;

  enableEdit() {
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
  }

  logout() {
    this.auth.logout();
  }

 updateProfile() {
  const updateData = {
    id: this.user.id,          
    email: this.user.email,
    username: this.user.username,
    role: this.user.role
  };

 this.userService.updateProfile(updateData).subscribe({
  next: (res:any) => {
    if(res.username==null){
      alert("")
    }
    alert("Profile updated successfully");
    this.editMode = false;
    localStorage.setItem("username", res.username);
    this.router.navigate(['/flight']);
    
  },
  error: (err) => {
    console.error("Update error:", err);
    this.errorMessage = err.error?.message || "Update failed! Username already exists";
  }
});

}

}
