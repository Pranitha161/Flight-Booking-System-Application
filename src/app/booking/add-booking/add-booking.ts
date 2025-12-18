import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Bookings, TRIP_TYPE, MEAL_PREFERENCE } from '../booking.module';
import { Router } from '@angular/router';
import { Booking } from '../booking';
import { CommonModule } from '@angular/common';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-add-booking',
  standalone:true,
  imports: [CommonModule, FormsModule,
    // ActivatedRoute
  ],
  templateUrl: './add-booking.html',
  styleUrl: './add-booking.css',
})
export class AddBooking {
  TRIP_TYPE = TRIP_TYPE;
  MEAL_PREFERENCE = MEAL_PREFERENCE;
  flight: any = null;
  bookings: Bookings = {
    email: '',
    seatCount: 1,
    tripType: TRIP_TYPE.ONE_WAY,
    mealPreference: MEAL_PREFERENCE.VEG,
    flightId: '',
    userIds: [],
    seatNumbers: []
  };
  errorMessage = '';
  userIdsInput = '';
  seatNumbersInput = '';

  constructor(
    private bookingService: Booking,
    private router: Router,
    private authService: Auth,
    private cd: ChangeDetectorRef

  ) {
    const nav = this.router.getCurrentNavigation(); this.flight = nav?.extras?.state?.['flight']; if (this.flight) {
      this.bookings.flightId = this.flight.flightId;

    }
  }
  ngOnInit() {
    this.bookings.email = this.authService.getUserEmail()!;
    this.bookings.userIds = [this.authService.getUserId()!];

  }

  updateUserIds() {
    this.bookings.userIds = this.userIdsInput
      .split(',')
      .map(v => v.trim())
      .filter(v => v.length > 0);
  }

  updateSeatNumbers() {
    this.bookings.seatNumbers = this.seatNumbersInput
      .split(',')
      .map(v => v.trim())
      .filter(v => v.length > 0);
  }

  addBooking(form: any) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    console.log(this.flight);
    this.bookingService.bookTicket(this.flight.id, this.bookings).subscribe({
      next: (res:any) => {
       
        this.router.navigate(['/payment'], {
          state: {
            pnr: res.pnr,
            amount: res.totalAmount
          }
        });
      },

      error: (err) => {
        this.errorMessage = err.error?.message || 'Unexpected error occurred';
        console.log(this.errorMessage);
        this.cd.detectChanges();
      }
    });
  }
}
