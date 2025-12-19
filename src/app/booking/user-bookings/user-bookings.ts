import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from '../booking';
import { Auth } from '../../auth/auth';
import { Bookings } from '../booking.module';

@Component({
  selector: 'app-user-bookings',
  imports:[CommonModule],
  templateUrl: './user-bookings.html',
  styleUrl: './user-bookings.css',
})
export class UserBookings implements OnInit{
  bookings: Bookings[] = [];
  errorMessage='';
  constructor (private bookingService:Booking,private authService :Auth,private cd:ChangeDetectorRef){}
  
  ngOnInit() {
    const email=this.authService.getUserEmail()!;
    if (!email) { this.errorMessage = 'No email found for logged-in user'; return; }
    this.bookingService.getByEmailId(email).subscribe(
      { 
        next: (res) => {this.bookings = res;
          this.cd.detectChanges();
        },
         error: (err) => this.errorMessage = err.error?.message || 'Failed to load booking history' 
        });
  }

}
