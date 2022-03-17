import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {
@Input() target: string;
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  navigate(): void {
    this.router.navigate([this.target]);
  }

}
