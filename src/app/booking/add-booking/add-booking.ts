import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Bookings, TRIP_TYPE, MEAL_PREFERENCE, BOOKING_STATUS } from '../booking.module';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../booking';
import { CommonModule } from '@angular/common';
import { Auth } from '../../auth/auth';
import { User, AuthResponse } from '../../services/user';
import { forkJoin } from 'rxjs';
import { SeatSelection } from '../../seats/seat-selection/seat-selection';
import { Seat } from '../../seats/seats';

@Component({
  selector: 'app-add-booking',
  standalone:true,
  imports: [CommonModule, FormsModule,SeatSelection],
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
    status:BOOKING_STATUS.CONFIRMED,
    flightId: '',
    userIds: [],
    seatNumbers: []
  };

  passengers: { name: string; email: string; seatNumber: string }[] = [];

  errorMessage = '';

  constructor(
    private bookingService: Booking,
    private router: Router,
    private authService: Auth,
    private cd: ChangeDetectorRef,
    private userService: User,
    private route: ActivatedRoute 
  ) { }

  ngOnInit() {
    this.bookings.email = this.authService.getUserEmail()!;
    this.bookings.userIds = [this.authService.getUserId()!];
    this.updatePassengerInputs(); 
    this.route.queryParams.subscribe(params => 
      { this.bookings.flightId = params['id']; 
       });
       
  }

  updatePassengerInputs() {
  this.passengers = Array.from({ length: this.bookings.seatCount }, () => ({
    name: '',
    email: '',
    seatNumber: ''
  }));
}

onSeatSelected(seat: Seat, passengerIndex: number) {
  const alreadyTaken = this.passengers.some(
    (p, idx) => idx !== passengerIndex && p.seatNumber === seat.seatNumber
  );

  if (alreadyTaken) {
    this.errorMessage = `Seat ${seat.seatNumber} is already selected by another passenger`;
    this.cd.detectChanges();
    return;
  }

  this.passengers[passengerIndex].seatNumber = seat.seatNumber;
}


 addBooking(form: any) {
  if (form.invalid) {
    form.control.markAllAsTouched();
    return;
  }
  this.bookings.seatNumbers = this.passengers.map(p => p.seatNumber);
  const lookups = this.passengers.map(p =>
    this.userService.getPassengerByEmail(p.email)
  );

  forkJoin(lookups).subscribe({
    next: (results: AuthResponse[]) => {
      this.bookings.userIds = results.map(r => r.id);
      this.bookings.email = this.authService.getUserEmail()!; 

      this.bookingService.bookTicket(this.bookings.flightId, this.bookings).subscribe({
        next: (res: any) => {
          this.cd.detectChanges();
          this.router.navigate(['/payment'], {
            state: { pnr: res.pnr, amount: res.totalAmount }
          });
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = err.error?.message || 'Unexpected error occurred';
          this.cd.detectChanges();
        }
      });
    },
    error: () => {
      this.errorMessage = 'Failed to resolve passenger IDs from emails';
    }
  });
}
}