import { Component } from '@angular/core';
import { Auth } from '../../auth/auth'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports:[CommonModule,RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
showAdmin = false;

  constructor(private auth: Auth) {}

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  get isAdmin() {
    return this.auth.getUserRole() === 'ROLE_ADMIN';
  }
 get username() {
    return localStorage.getItem("username");
  }

get userRole() {
  return this.auth.getUserRole();
}


  logout() {
    this.auth.logout();
  }
}
