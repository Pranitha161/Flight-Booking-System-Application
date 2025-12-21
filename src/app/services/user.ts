import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AuthResponse {
  id: string;
  email: string;
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class User{
  private baseUrl = 'http://localhost:8765/user-service/auth';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.baseUrl}/me`);
  }

  updateProfile(data: Partial<AuthResponse>): Observable<AuthResponse> {
    return this.http.put<AuthResponse>(`${this.baseUrl}/me`, data);
  }

  getPassengerByEmail(email: string): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.baseUrl}/get/email/${encodeURIComponent(email)}`);
  }

  getPassengerById(passengerId: string): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.baseUrl}/get/${passengerId}`);
  }

  changePassword(oldPassword:string,newPassword:string){
    return this.http.post<any>(`${this.baseUrl}/change-password`,{oldPassword,newPassword});
  }

  deletePassenger(passengerId: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/delete/${passengerId}`);
  }
}
