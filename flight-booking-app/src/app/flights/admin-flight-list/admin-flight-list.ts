import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Flights } from '../flights';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin-flights',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-flight-list.html',
  styleUrls: ['./admin-flight-list.css']
})
export class AdminFlightList implements OnInit {

  flights: any[] = [];

  constructor(private flightService: Flights, private router: Router,private cd:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights() {
    this.flightService.getAllFlights().subscribe(res => {
      console.log(res);
      this.flights = res;
      this.cd.detectChanges(); 
    });
  }

  editFlight(id: string) {
    this.router.navigate(['/admin/flights/edit', id]);
  }

  deleteFlight(id: string) {
    if (confirm("Are you sure you want to delete this flight?")) {
      this.flightService.deleteFlight(id).subscribe(() => {
        alert("Flight deleted");
        this.loadFlights();
      });
    }
  }
}
