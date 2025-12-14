import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Airlines {
  baseUrl = "http://localhost:8765/flight-service-auth/api/flight/airline";

  constructor(private http: HttpClient) {}

  getAllAirlines() {
    return this.http.get<any[]>(`${this.baseUrl}/get`);
  }

  getAirlineById(id: string) {
    return this.http.get(`${this.baseUrl}/get/${id}`);
  }

  addAirline(airline: any) {
    return this.http.post(`${this.baseUrl}/add`, airline, { responseType: 'text' });
  }
}
