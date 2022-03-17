import { Component, OnInit } from '@angular/core';
import { BigNumber } from 'bignumber.js';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Subscription } from 'rxjs';
import { KeyService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-username-pay',
  templateUrl: './username-pay.component.html',
  styleUrls: ['./username-pay.component.scss']
})
export class UsernamePayComponent implements OnInit {
  friendName: string;
  myUsername: string;
  targetKey: string;
  amount: number;
  message: string = '';
  sub: Subscription;

  constructor(private keyService: KeyService, public router: Router) { }

  ngOnInit(): void {
    this.sub = this.keyService.getMyUserName().subscribe(acct =>{
      if (acct == undefined) {
        this.router.navigate(['/username-form']);
      } else {
        this.myUsername = acct.username;
      }
    }
      )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  setFriendName(username: string){
    this.friendName = username;
  }

  setTargetKey(key: string){
    this.targetKey = key;
  }

  ready(){
    return this.friendName != null && this.targetKey != null && this.amount > 0;
  }
  asBigNumber(smallNumber: number){
    return new BigNumber(smallNumber);
  }
}
