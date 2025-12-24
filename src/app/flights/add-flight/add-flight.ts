import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Flights } from '../flights';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-add-flight',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-flight.html',
  styleUrls: ['./add-flight.css']
})
export class AddFlight implements OnInit {

  flight = {
    fromPlace: '',
    toPlace: '',
    departureTime: '',
    arrivalTime: '',
    availableSeats: 0,
    price: {
      oneWay: 0,
      roundTrip: 0
    },
    airlineId: ''
  };
  states: string[] = [];
  errorMessage = '';
  
  minDate: string = '';
  constructor(private flightService: Flights, private router: Router, private cd: ChangeDetectorRef, private route: ActivatedRoute) { }
  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      if (params['airlineId']) {
        this.flight.airlineId = params['airlineId'];
      }
    });
    const today = new Date(); this.minDate = today.toISOString().slice(0,16);
    this.states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'];
  }

  addFlight(form: any) {
    if (form.invalid) { form.control.markAllAsTouched(); return; }
    this.flightService.addFlight(this.flight).subscribe({
      next: () => {
        this.router.navigate(['/admin/flights']);
      },
      error: (err) => {
        console.log('Error adding flight', err);

        this.errorMessage = Array.isArray(err.error?.errors)
          ? err.error.errors[0]
          : err.error?.error || 'Unexpected error occurred';

        this.cd.detectChanges();
      }

    });
  }
}
