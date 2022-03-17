import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goto-login',
  templateUrl: './goto-login.component.html',
  styleUrls: ['./goto-login.component.scss']
})
export class GotoLoginComponent implements OnInit {
  @Input() message = '';

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
  }

  go(): void {
    this.router.navigate(['/login']);
  }

}
