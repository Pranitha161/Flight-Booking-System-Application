import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../services/user';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,CommonModule],
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

  constructor(private userService: User,private cd: ChangeDetectorRef) {}

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

  updateProfile() {
    const updateData = {
      name: this.user.name,
      phone: this.user.phone
    };

    this.userService.updateProfile(updateData).subscribe(() => {
      alert("Profile updated successfully");
      this.editMode = false;
    });
  }
}
