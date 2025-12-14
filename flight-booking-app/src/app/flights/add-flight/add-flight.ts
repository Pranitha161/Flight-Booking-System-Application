import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Flights } from '../flights';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-flight',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-flight.html',
  styleUrls: ['./add-flight.css']
})
export class AddFlight {

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

  constructor(private flightService: Flights, private router: Router) {}

  addFlight() {
    this.flightService.addFlight(this.flight).subscribe({
      next: () => {
        alert('Flight added successfully');
        this.router.navigate(['/admin/flights']);
      },
      error: (err) => console.log('Error adding flight', err)
    });
  }
}
