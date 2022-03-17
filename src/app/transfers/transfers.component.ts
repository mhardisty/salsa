import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  goToScanner() {
    this.router.navigate(['/scan']);
  }

  goToDisplayQR() {
    this.router.navigate(['/display-QR']);
  }

  goToUsernamePay() {
    this.router.navigate(['/username-pay']);
  }




}
