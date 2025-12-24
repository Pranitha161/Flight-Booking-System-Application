import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Seats, Seat } from '../seats'
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './seat-selection.html',
  styleUrls: ['./seat-selection.css']
})
export class SeatSelection implements OnInit {

  @Input() flightId!: string;
  @Output() seatSelected = new EventEmitter<Seat>();

  seats: Seat[] = [];
  selectedSeat: Seat | null = null;

  constructor(private seatService: Seats) {}

  ngOnInit() {
    this.loadSeats();
  }

  loadSeats() {
    this.seatService.getSeatsByFlightId(this.flightId).subscribe({
      next:(data)=>this.seats = data,
      error:(err)=>console.log("failed to load",err)
    });
  }

  selectSeat(seat: Seat) {
    if (!seat.available) return;
    this.selectedSeat = seat;
    this.seatSelected.emit(seat);
  }
}
