import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  flight: any = null;

  constructor(
    private route: ActivatedRoute,
    private flightService: Flights,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.flightService.getFlightById(id!).subscribe(res => {
      setTimeout(() => {
        this.flight = res;
        this.cd.detectChanges();
      });

    });
  }

  updateFlight() {
    this.flightService.updateFlight(this.flight.id, this.flight).subscribe(() => {
      alert("Flight updated successfully");
      this.router.navigate(['/admin']);
    });
  }
}
