import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from '../booking';
import { Auth } from '../../auth/auth';
import { Bookings } from '../booking.module';
import { Router } from '@angular/router';
import { Flight } from '../../flights/flight.model';
import { Flights } from '../../flights/flights';

@Component({
  selector: 'app-user-bookings',
  imports:[CommonModule],
  templateUrl: './user-bookings.html',
  styleUrl: './user-bookings.css',
})
export class UserBookings implements OnInit{
  bookings: (Bookings& { flight?: Flight })[] = [];
  errorMessage='';
  constructor (private bookingService:Booking,private authService :Auth,private flightService:Flights,private cd:ChangeDetectorRef,private router:Router){}
  
  ngOnInit() {
    const email=this.authService.getUserEmail()!;
    if (!email) { this.errorMessage = 'No email found for logged-in user'; return; }
    this.bookingService.getByEmailId(email).subscribe(
      { 
        next: (res) => {this.bookings = res;
          console.log(res);
          this.cd.detectChanges();
          this.bookings.forEach((b) => { 
            this.flightService.getFlightById(b.flightId).subscribe({ next: (flight: Flight) => { b.flight = flight; this.cd.detectChanges(); }, error: () => { b.flight = undefined; }, }); 
            console.log(this.bookings);
          });
        },
         error: (err) => this.errorMessage = err.error?.message || 'Failed to load booking history' 
        });
  }
  delete(booking:any){
    console.log(booking+" "+booking.pnr);
    this.router.navigate(['/delete'],{state:{pnr:booking.pnr}});
  }
  canCancel(booking: Bookings & { flight?: Flight }): boolean { 
    if (booking.status === 'CANCELLED') return false;
    if (!booking.flight?.departureTime) return false; 
    const departure = new Date(booking.flight.departureTime).getTime(); return departure > Date.now();
   }

}
