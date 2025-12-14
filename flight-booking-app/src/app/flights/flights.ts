import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from './flight.model';
@Injectable({
  providedIn: 'root',
})
export class Flights {
  private baseUrl = 'http://localhost:8765/flight-service-auth/api/flight';

  constructor(private http: HttpClient) { }

  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.baseUrl}/get/flights`);
  }

  getFlightById(id: string): Observable<Flight> {
    return this.http.get<Flight>(`${this.baseUrl}/get/${id}`);
  }

  searchFlights(from: string, to: string, date: string): Observable<Flight[]> {
    return this.http.post<Flight[]>(`${this.baseUrl}/search`, {
      fromPlace: from,
      toPlace: to,
      date: date
    });
  }


  addFlight(flight: Flight): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, flight);
  }

  updateFlight(id: string, flight: Flight): Observable<any> {
    return this.http.put(`${this.baseUrl}/flights/${id}`, flight);
  }

  deleteFlight(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/flights/${id}`);
  }
}
