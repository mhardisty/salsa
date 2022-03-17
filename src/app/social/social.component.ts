import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  RpcResponseAndContext,
  SignatureStatus,
  TransactionSignature,
  clusterApiUrl,
  Connection,
} from '@solana/web3.js';
import { KeyService } from '../database.service';
import { NamedKey } from '../NamedKey.model';
import { SimplifiedTransaction } from '../Transaction.model';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent implements OnInit {
  transactions: SimplifiedTransaction[] = [];
  primaryAccount: NamedKey;
  constructor(private keyService: KeyService, public router: Router) {}

  ngOnInit(): void {
    this.keyService.getUserKeys().subscribe((keys) => {
      for (let key of keys) {
        if (key.primary) {
          this.primaryAccount = key;
        }
      }
      this.getTransactions();
    });
  }

  asDate(timestamp: number) {
    let date = new Date(timestamp * 1000);
    return (
      (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
    );
  }

  createTransactionObject(tx: object): SimplifiedTransaction {
    let imp = tx['transaction']['message']['instructions'].find(
      (ins: Object) => {
        if (typeof ins === 'object' && 'parsed' in ins) {
          if (typeof ins['parsed'] === 'object' && 'info' in ins['parsed']) {
            if ('source' in ins['parsed']['info']) {
              return true;
            }
          }
        }
        return false;
      }
    );

    const data = {
      signature: tx['transaction']['signatures'][0],
      from: imp['parsed']['info']['source'],
      to: imp['parsed']['info']['destination'],
      amount: imp['parsed']['info']['lamports'] / LAMPORTS_PER_SOL,
      memo: tx['transaction']['message']['instructions'][0]['parsed'],
      fee: tx['meta']['fee'],
      blockTime: tx['blockTime'],
    };
    return data;
  }

  goToConversation(tx: SimplifiedTransaction) {
    this.router.navigate(['tx', tx.signature]);
  }

  async getTransactions() {
    try {
      const cluster = 'devnet';
      const endpoint = clusterApiUrl(cluster);
      const connection = new Connection(endpoint, 'confirmed');
      const confirmedSignatureInfos = await connection
        .getSignaturesForAddress(
          new PublicKey(this.primaryAccount.key),
          { limit: 10 },
          'confirmed'
        )
        .then((signatures) => {
          const signatureStrings = signatures.map((sign) => sign.signature);
          connection
            .getParsedTransactions(signatureStrings)
            .then((transactions) => {
              this.transactions = transactions.map((tx) =>
                this.createTransactionObject(tx)
              );
            })
            .then((_) => {
              for (const [i, tx] of this.transactions.entries()) {
                let source = tx.from;
                let destination = tx.to;

                this.keyService
                  .getUserNameFromKey(source)
                  .subscribe((username) => {
                    this.transactions[i].from = username;
                  });
                this.keyService
                  .getUserNameFromKey(destination)
                  .subscribe((username) => {
                    this.transactions[i].to = username;
                  });
              }
            });
        });
    } catch (error: any) {
      console.error(error);
    }
  }
}
