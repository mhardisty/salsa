import { Component, OnInit } from '@angular/core';
import { Connection, sendAndConfirmTransaction, Keypair, Transaction, SystemProgram, PublicKey, TransactionInstruction } from "@solana/web3.js";
// import * as solanaWeb3 from '@solana/web3.js';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  secretKey: any;
  publicKey: PublicKey;

  sk1 = [
    18, 208, 139, 205, 114, 20, 101, 141, 200, 58, 184, 108, 103, 204, 248, 174,
    94, 209, 26, 61, 134, 235, 252, 85, 172, 36, 46, 203, 90, 21, 42, 6, 168,
    237, 191, 12, 27, 216, 165, 153, 176, 24, 18, 30, 84, 110, 139, 69, 104,
    224, 10, 117, 106, 244, 128, 255, 115, 84, 235, 71, 184, 40, 65, 162,
  ];

  pk1 = 'CNRkvMBvqrCPB3PqWpvS2ck7DNvjfA4ongZq2FLDfGzD';

  sk2 = [
    133, 33, 233, 168, 238, 166, 244, 84, 188, 253, 227, 56, 221, 48, 111, 40,
    232, 176, 115, 129, 64, 244, 251, 97, 202, 82, 156, 32, 247, 49, 248, 170,
    83, 80, 154, 150, 100, 47, 168, 177, 143, 144, 16, 197, 115, 174, 161, 239,
    218, 37, 181, 113, 48, 237, 254, 224, 254, 13, 153, 246, 119, 251, 48, 211,
  ];
  pk2 = '6cE8Gm1S91zLb4W19mMKCWBJaShhEnURjctB3vzcjsYe';


mike_pk = '9wBj8LvmgiPXvoucsCZnnc9BfK9LitZo7RwV71hgSPnn';

  constructor() {}

  ngOnInit(): void {}

  generateKeyPair() {

    const account = new Keypair();
    this.publicKey = account.publicKey;
    this.secretKey = account.secretKey;
  }

  // requestSol() {
  //   const connection= new Connection("https://api.devnet.solana.com/");
  //   connection.requestAirdrop(new PublicKey(this.mike_pk), 2e9);
  // }
}
