import { Component, OnInit } from '@angular/core';
import { Airlines } from '../airlines'; 
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-admin-airline-list',
  standalone: true,
    imports: [CommonModule, RouterModule],
  templateUrl: './admin-airline-list.html',
  styleUrls: ['./admin-airline-list.css']
})
export class AdminAirlineList implements OnInit {

  airlines: any[] = [];

  constructor(private airlineService: Airlines, private router: Router,private cd:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadAirlines();
  }

  loadAirlines() {
    this.airlineService.getAllAirlines().subscribe(res => {
      this.airlines = res;
      console.log(res);
      this.cd.detectChanges();
    });
  }

  addAirline() {
    this.router.navigate(['/admin/airlines/add']);
  }
  addInventory(airlineId: number) {
  this.router.navigate(['/admin/flights/add'], { queryParams: { airlineId } });
}

}
