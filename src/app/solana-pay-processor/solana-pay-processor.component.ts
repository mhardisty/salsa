import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicKey } from '@solana/web3.js';
import { BigNumber } from 'bignumber.js';
@Component({
  selector: 'app-solana-pay-processor',
  templateUrl: './solana-pay-processor.component.html',
  styleUrls: ['./solana-pay-processor.component.scss'],
})
export class SolanaPayProcessorComponent implements OnInit {
  @Input() requestURL: string = '';
  amount: BigNumber;
  recipient: string;
  reference: string;
  label: string;
  message: string;
  memo: string;

  approved: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const { protocol, pathname, searchParams } = new URL(this.requestURL);
    if (protocol != 'solana') {
      console.log("Yikes! they don't match");
    }
    this.recipient = pathname;
    this.amount = new BigNumber( searchParams.get('amount') );
    this.label = searchParams.get('label');
    this.memo = searchParams.get('memo');
    this.message = searchParams.get('message');
    this.reference = searchParams.get('reference');
  }

  approve() {
    this.approved = true;
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
