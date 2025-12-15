import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Flights } from '../flights/flights';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './flight-search.html',
  styleUrls: ['./flight-search.css']
})
export class FlightSearch {

  fromPlace: string = '';
  toPlace: string = '';
  date: string = '';

  flights: any[] = [];

  constructor(private flightService: Flights) { }

  searchFlights() {
    const body = {
      fromPlace: this.fromPlace,
      toPlace: this.toPlace,
      date: this.date
    };

    this.flightService.searchFlights(this.fromPlace, this.toPlace, this.date)
      .subscribe({
        next: (res) => {
          this.flights = res;
          console.log('Search results:', this.flights);
        },
        error: (err) => console.log(err)
      });

  }

  book(flight: any) {
    console.log('Selected flight:', flight);
  }
}
