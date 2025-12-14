import { Component, OnInit } from '@angular/core';
import { Flights } from '../flights';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-list.html',
  styleUrls: ['./flight-list.css'],
})
export class FlightListComponent implements OnInit {
  flights: any[] = [];

  constructor(private flightService: Flights, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe({
      next: (res) => {
        this.flights = res;
        this.cd.detectChanges();
      },
      error: (err) => console.log('Error loading flights', err),
    });
  }
}
