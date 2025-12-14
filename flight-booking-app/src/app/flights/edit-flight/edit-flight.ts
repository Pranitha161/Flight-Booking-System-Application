import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Flights } from '../flights';

@Component({
  selector: 'app-edit-flight',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-flight.html',
  styleUrls: ['./edit-flight.css']
})
export class EditFlight implements OnInit {

  flight: any = {};

  constructor(
    private route: ActivatedRoute,
    private flightService: Flights,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.flightService.getFlightById(id!).subscribe(res => {
      this.flight = res;
    });
  }

  updateFlight() {
    this.flightService.updateFlight(this.flight.id, this.flight).subscribe(() => {
      alert("Flight updated successfully");
      this.router.navigate(['/admin']);
    });
  }
}
