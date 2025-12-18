import { Component } from '@angular/core';
import { Airlines } from '../airlines';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-add-airline',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-add-airline.html',
  styleUrls: ['./admin-add-airline.css']
})
export class AdminAddAirline {

  airline = {
    name: '',
    logoUrl: '',
    flightIds: []
  };

  constructor(private airlineService: Airlines, private router: Router) { }

  saveAirline(form: any) {
    if (form.invalid) { form.control.markAllAsTouched(); return; }
    this.airlineService.addAirline(this.airline).subscribe(() => {
      this.router.navigate(['/admin/airlines']);
    });
  }

}
