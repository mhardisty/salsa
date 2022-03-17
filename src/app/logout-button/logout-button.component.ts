import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
  }

  isSignedIn(): boolean {
    let usFindOut = false;
    const user = this.afAuth.currentUser.then((e)=>{
      usFindOut = false;
    });
    return usFindOut;
  }

  signOut(): void {
    
    this.afAuth.signOut();
    this.router.navigate(['/login'])
  }

}
