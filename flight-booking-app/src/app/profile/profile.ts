import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../services/user';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
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

  constructor(private userService: User) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe((res: any) => {
      this.user = res;
    });
  }

  updateProfile() {
    const updateData = {
      name: this.user.name,
      phone: this.user.phone
    };

    this.userService.updateProfile(updateData).subscribe(() => {
      alert("Profile updated successfully");
    });
  }
}
