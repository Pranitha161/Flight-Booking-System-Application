import { Component } from '@angular/core';
import { Airlines } from '../airlines'; 
import { Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-add-airline',
  standalone: true,
  imports:[CommonModule,RouterModule,FormsModule],
  templateUrl: './admin-add-airline.html',
  styleUrls: ['./admin-add-airline.css']
})
export class AdminAddAirline {

airline = {
  name: '',
  logoUrl: '',
  flightIds: []
};


  constructor(private airlineService: Airlines, private router: Router) {}

  saveAirline() {

  
  if (!this.airline.name.trim()) {
    alert("Airline name is required");
    return;
  }

  if (!this.airline.logoUrl.trim()) {
    alert("Logo URL is required");
    return;
  }

  const urlRegex = /^(http|https):\/\/.*$/;
  if (!urlRegex.test(this.airline.logoUrl)) {
    alert("Logo URL must start with http or https");
    return;
  }

  this.airlineService.addAirline(this.airline).subscribe(() => {
    alert("Airline added successfully");
    this.router.navigate(['/admin/airlines']);
  });
}

}
