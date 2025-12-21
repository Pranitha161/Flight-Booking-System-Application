import { Component, OnInit } from '@angular/core';
import { Flights } from '../flights';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../auth/auth';


@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-list.html',
  styleUrls: ['./flight-list.css'],
})
export class FlightListComponent implements OnInit {
  flights: any[] = [];
  currentRole: string | null = '';


  constructor(private flightService: Flights, private cd: ChangeDetectorRef, private router: Router,private authService:Auth) { }
  ngOnInit(): void {
    this.currentRole = this.authService.getUserRole();
    console.log(this.currentRole);
    this.flightService.getAllFlights().subscribe({
      next: (res) => {
        this.flights = res;
        this.cd.detectChanges();
      },
      error: (err) => console.log('Error loading flights', err),
    });
  }
  book(flight: any) {
    this.router.navigate(['/add'], { queryParams: { id: flight.id }});
  }
}
