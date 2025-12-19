import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-booking',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './delete-booking.html',
  styleUrl: './delete-booking.css',
})

export class DeleteBooking{
  pnr='';
  errorMessage='';
    constructor(private bookingService:Booking,private router:Router,private cd:ChangeDetectorRef){
      const nav=this.router.getCurrentNavigation();
      this.pnr=nav?.extras?.state?.['pnr'];
      console.log(this.pnr);
    }
    cancelBooking(){
    if(this.pnr){
    this.bookingService.cancelBooking(this.pnr).subscribe({
      next:()=>{
        console.log("deleted")
        this.router.navigate(['/history']);
        this.cd.detectChanges();

      },error:err=>{
        this.errorMessage=err.error?.message||'Cannot delete the booking';
        this.cd.detectChanges();
        console.log(err.error);
        
      }
    })
    }
  }
  
  goback(){
    this.router.navigate(['/history']);
  }
    
}
