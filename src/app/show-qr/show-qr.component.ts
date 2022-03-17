import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { createQR } from '@solana/pay';
import { Subscription } from 'rxjs';
import { KeyService } from '../database.service';
import { NamedKey } from '../NamedKey.model';
import { UserAccount } from '../UserAccount.model';
@Component({
  selector: 'app-show-qr',
  templateUrl: './show-qr.component.html',
  styleUrls: ['./show-qr.component.scss']
})
export class ShowQrComponent implements OnInit {
amount: number;
memo: string = '';
keys: NamedKey[];
sub: Subscription;
nameSub: Subscription;
account: UserAccount;
  constructor(private keyService:KeyService, public router: Router) { }
  @ViewChild("canvas", { static: true }) canvas: ElementRef;
  showing: boolean = false;

  ngOnInit(): void {
    this.sub = this.keyService
      .getUserKeys()
      .subscribe((keys) => (this.keys = keys));
    this.nameSub = this.keyService.getUserName().subscribe((acct) => (this.account = acct))
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.nameSub.unsubscribe();
  }

  generateURL() : string {
    let recipient: string;
    for (let k of this.keys){
      if (k.primary) {
        recipient = k.key;
      }
    }

    let url = `solana:${recipient}?amount=${this.amount}&label=${this.account.username}`
    if (this.memo.length > 0){
      url += `&memo=${this.memo}`;
    }
    return url;
  }

  show() {
    this.showing = true;
    let width = window.innerWidth;
    let qrCode = createQR(this.generateURL(), width * 0.9);
    qrCode.append(this.canvas.nativeElement);
    
  }

  cancel() {
    this.showing = false;
    this.router.navigate(['/'])
  }

}
