import { Component } from '@angular/core';
import { Auth } from '../auth/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {

  constructor(private auth: Auth) { }

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  get username() {
    return localStorage.getItem("username");
  }
}
