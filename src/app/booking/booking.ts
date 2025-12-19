import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bookings } from './booking.module';

@Injectable({
  providedIn:'root',
})
export class Booking {
  private baseUrl='http://localhost:8765/booking-service-auth/api';
  constructor(private http:HttpClient){}
  bookTicket(id:string,booking:Bookings):Observable<any>{
    return this.http.post(`${this.baseUrl}/booking/${id}`,booking);
  }
  getByPnr(pnr:string):Observable<Bookings>{
    return this.http.get<Bookings>(`${this.baseUrl}/ticket/${pnr}`);
  }
  getByEmailId(email:string):Observable<Bookings[]>{
    return this.http.get<Bookings[]>(`${this.baseUrl}/history/${email}`);
  }
  cancelBooking(pnr:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}/booking/cancel/${pnr}`);
  }
}
