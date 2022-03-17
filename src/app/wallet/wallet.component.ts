import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NamedKey } from '../NamedKey.model';
import { Subscription } from 'rxjs';
import { KeyService } from '../database.service';

import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { SnackbarService } from '../snackbar.service';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  keys: NamedKey[];
  sub: Subscription;
  balances: object = {};

  constructor(public router: Router, public keyService: KeyService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.sub = this.keyService
      .getUserKeys()
      .subscribe((keys) => (this.keys = keys));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  goToKeyCreator() {
    this.router.navigate(['/key-creator']);
  }
  goToKeyImporter() {
    this.router.navigate(['/key-importer']);
  }

  goToUsernameForm() {
    this.router.navigate(['/username-form']);
  }

  hasBalance(key: string) {
    return key in this.balances;
  }

  getBalance(key: string) {
    return this.balances[key];
  }

  deleteKey(key: NamedKey) {
    if (!key.primary) {
      this.keyService.deleteKey(key.id);
    } else {
      this.snackbarService.generalError('Cannot delete primary key', 'Got it, Chief!');
    }
  }
  setAsPrimary(id: string) {
    for (let key of this.keys) {
      if (key.id == id) {
        this.keyService.updateKey(id, { primary: true });
      } else {
        if (key.primary) {
          this.keyService.updateKey(key.id, { primary: false });
        }
      }
    }
  }
  checkBalance(key: string) {
    const connection = new Connection('https://api.devnet.solana.com/');

    const publicKey = new PublicKey(key);
    connection.getBalance(publicKey).then((balance) => {
      this.balances[key] = balance / LAMPORTS_PER_SOL;
    });
  }
  tester(key: string) {
    console.log('tester');
    return 100;
  }

  requestAirDrop(key: string) {
    const connection = new Connection('https://api.devnet.solana.com/');

    const publicKey = new PublicKey(key);
    connection
      .requestAirdrop(publicKey, LAMPORTS_PER_SOL)
      .then((confirmation) => {
        console.log(confirmation);
        this.checkBalance(key);
      });
    this.snackbarService.generalError('Your money is on its way!','Nice!');
  }

}
