import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  imports: [],
  standalone:true,
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {
  pnr: string = '';
  amount: number = 0;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.pnr = nav?.extras?.state?.['pnr'];
    console.log(this.pnr);
    this.amount = nav?.extras?.state?.['amount'];
  }
}
