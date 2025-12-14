import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private baseUrl='http://localhost:8765/auth-service/auth';
  constructor(private http:HttpClient,private router:Router){}
  login(body:{username:string;password:string}){
    return this.http.post<any>(`${this.baseUrl}/login`,body);
  }
  saveToken(token:string){
    console.log(token);
    localStorage.setItem('token',token);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  signup(body:any){
    return this.http.post(`${this.baseUrl}/signup`,body);
  }
  isLoggedIn() {
    return !!this.getToken();
  }
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log(payload);
    return payload.roles;
  }
  getUserEmail(): string | null {
  const token = this.getToken();
  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.email;
}

getUserId(): string | null {
  const token = this.getToken();
  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.sub;
}
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}


  
 

 

