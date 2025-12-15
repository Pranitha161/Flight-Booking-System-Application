import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class User {

  private baseUrl = 'http://localhost:8765/user-service/auth';

  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(`${this.baseUrl}/me`);
  }

  updateProfile(data: any) {
    return this.http.put(`${this.baseUrl}/me`, data);
  }
}
