import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Flights } from '../flights/flights';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './flight-search.html',
  styleUrls: ['./flight-search.css']
})
export class FlightSearch implements OnInit {

  fromPlace: string = '';
  toPlace: string = '';
  date: string = '';
  minDate: string = '';

  flights: any[] = [];
  fromPlaces: string[] = [];
  toPlaces: string[] = [];
  constructor(private flightService: Flights, private cd: ChangeDetectorRef, private router: Router) { }
  ngOnInit(): void {
    this.loadPlaces();
    const today = new Date(); this.minDate = today.toISOString().split('T')[0];
  }
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
          this.cd.detectChanges();
        },
        error: (err) => console.log(err)
      });

  }
  loadPlaces() {
    this.flightService.getAllFlights().subscribe({
      next: (flights: any[]) => {
        this.fromPlaces = [...new Set(flights.map(f => f.fromPlace))];
        this.toPlaces = [...new Set(flights.map(f => f.toPlace))];
        this.cd.detectChanges();
      },
      error: (err) => console.log(err)
    })
  }
  book(flight: any) {
    this.router.navigate(['/add'],{ queryParams: { id: flight.id}});
  }
}
