import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from '../booking';
import { Auth } from '../../auth/auth';
import { Bookings, BookingWithFlight } from '../booking.module';
import { Router } from '@angular/router';
import { Flight } from '../../flights/flight.model';
import { Flights } from '../../flights/flights';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-user-bookings',
  imports: [CommonModule],
  templateUrl: './user-bookings.html',
  styleUrls: ['./user-bookings.css'],
})
export class UserBookings implements OnInit {
  bookings: BookingWithFlight[] = [];
  errorMessage = '';

  constructor(
    private bookingService: Booking,
    private authService: Auth,
    private flightService: Flights,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    const email = this.authService.getUserEmail();
    if (!email) {
      this.errorMessage = 'No email found for logged-in user';
      return;
    }

    this.bookingService.getByEmailId(email).subscribe({
      next: (res: Bookings[]) => {
        const flightRequests = res.map(b =>
          this.flightService.getFlightById(b.flightId)
        );
        forkJoin(flightRequests).subscribe({
          next: (flights: Flight[]) => {
            this.bookings = res.map((b, i) => ({
              ...b,
              flight: flights[i]
            })) as BookingWithFlight[];

            this.bookings.sort((a, b) =>
              new Date(b.flight?.departureTime || 0).getTime() -
              new Date(a.flight?.departureTime || 0).getTime()
            );

            this.cd.detectChanges();
          },
          error: () => {
            this.errorMessage = 'Failed to load flight details';
          }
        });
      },
      error: (err) =>
      (this.errorMessage =
        err.error?.message || 'Failed to load booking history'),
    });
  }
  delete(booking: BookingWithFlight) {
    this.router.navigate(['/delete'], { state: { pnr: booking.pnr } });
  }

  canCancel(booking: BookingWithFlight): boolean {
    if (booking.status === 'CANCELLED') return false;
    if (!booking.flight?.departureTime) return false;
    const departure = new Date(booking.flight.departureTime).getTime();
    return departure > Date.now();
  }
}
