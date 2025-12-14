import { Component, OnInit } from '@angular/core';
import { Flights } from '../flights';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './flight-list.html',
  styleUrls: ['./flight-list.css'],
})
export class FlightList implements OnInit {
  flights: any[] = [];

  constructor(private flightService: Flights) {}

  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe({
      next: (res) => {
        this.flights = res;
        console.log('Flights loaded:', this.flights);
      },
      error: (err) => console.log('Error loading flights', err),
    });
  }
}
