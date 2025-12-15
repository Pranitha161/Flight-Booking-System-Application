import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Seat {
  id?: string;
  seatNumber: string;
  available: boolean;
  flightId: string;
}

@Injectable({
  providedIn: 'root'
})
export class Seats {

  private baseUrl = 'http://localhost:8765/flight-service-auth/api/seats';

  constructor(private http: HttpClient) {}

  getSeatsByFlightId(flightId: string): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${this.baseUrl}/flight/${flightId}`);
  }

  updateSeats(flightId: string, seats: Seat[]): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/flights/${flightId}/seats`, seats);
  }
}
