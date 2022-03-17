import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { KeyService } from '../database.service';
import { NamedKey } from '../NamedKey.model';
import { PrivateKeyService } from '../private-key.service';
import { SnackbarService } from '../snackbar.service';
import {
  Connection,
  sendAndConfirmTransaction,
  Keypair,
  Transaction,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js';
import { createTransaction } from '@solana/pay';
import { clusterApiUrl } from '@solana/web3.js';
import { BigNumber } from 'bignumber.js';
import { Router } from '@angular/router';
import { InstantMessageService } from '../instant-message.service';
@Component({
  selector: 'app-select-and-pay',
  templateUrl: './select-and-pay.component.html',
  styleUrls: ['./select-and-pay.component.scss'],
})
export class SelectAndPayComponent implements OnInit {
  @Input() recipient: string;
  @Input() amount: BigNumber;
  @Input() reference: string;
  @Input() memo: string;
  keys: NamedKey[] = [];
  sub: Subscription;

  constructor(
    public keyService: KeyService,
    public messenger: InstantMessageService,
    private router: Router,
    public snackService: SnackbarService,
    private pk: PrivateKeyService
  ) {}

  ngOnInit(): void {
    this.sub = this.keyService
      .getUserKeys()
      .subscribe((keys) => (this.keys = keys.filter((key) => key.primary)));
  }

  available(key: NamedKey) {
    let storedKeys = this.pk.getKeys();
    for (let k of storedKeys) {
      if (k == key.key) {
        return true;
      }
    }
    return false;
  }

  select(key: NamedKey) {
    let wallet = this.pk.getKeypairFromKey(key.key);
    const cluster = 'devnet';
    const endpoint = clusterApiUrl(cluster);
    const connection = new Connection(endpoint, 'confirmed');

    const recipientPK = new PublicKey(this.recipient);
    // Create a transaction to transfer native SOL or SPL tokens
    createTransaction(connection, wallet.publicKey, recipientPK, this.amount!, {
      reference: recipientPK,
      memo: this.memo,
    })
      .then((tx) => {
        sendAndConfirmTransaction(connection, tx, [wallet]).then(
          (txDetails) => {
            this.messenger.sendMessage({
              text: this.memo,
              timestamp: Date.now(),
              signature: txDetails,
            });
            this.snackService.generalError('Paid!', 'OK');
            this.router.navigate(['/']);
          }
        );
      })
      .catch((err) => {
        this.snackService.errorWithRouter(err, 'OK', ['/']);
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
