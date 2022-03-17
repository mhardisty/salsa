import { Component, OnInit } from '@angular/core';
import * as Bip39 from 'bip39';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  Connection,
  sendAndConfirmTransaction,
  Keypair,
  Transaction,
  SystemProgram,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js';
import { clusterApiUrl } from '@solana/web3.js';
import { KeyService } from '../database.service';
import { Router } from '@angular/router';
import { NamedKey } from '../NamedKey.model';
import { Subscription } from 'rxjs';
import { PrivateKeyService } from '../private-key.service';
@Component({
  selector: 'app-key-creator',
  templateUrl: './key-creator.component.html',
  styleUrls: ['./key-creator.component.scss'],
})
export class KeyCreatorComponent implements OnInit {
  words: any;
  generatedMnemonic: any;
  newAccount: any;
  pubKey: any;
  nickname: string = '';
  network = WalletAdapterNetwork.Devnet;
  endpoint = clusterApiUrl(this.network);
  mike_pub_key = new PublicKey('9wBj8LvmgiPXvoucsCZnnc9BfK9LitZo7RwV71hgSPnn');
  rz_pub_key = new PublicKey('HBXAAy1GrUmmLZmbmE1M85fn8s8HBoXXveBs9baDxswE');
  status: string;
  keys: NamedKey[];
  sub: Subscription;
  constructor(private keyService: KeyService, private router: Router, private pk: PrivateKeyService) {}

  ngOnInit(): void {
    this.sub = this.keyService
      .getUserKeys()
      .subscribe((keys) => (this.keys = keys));
    this.words = Bip39.generateMnemonic();
    this.generatedMnemonic = this.words.split(' ');
    const seed = Bip39.mnemonicToSeedSync(this.words);
    this.newAccount = Keypair.fromSeed(seed.slice(0, 32));
    this.pubKey = this.newAccount.publicKey;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  hasPrimary() {
    return this.keys.some(key => key.primary);
  }

  async saveKey() {
    this.pk.saveKey(this.pubKey.toBase58(), this.words);
    // console.log(this.newAccount);
    // console.log(this.pubKey.toBase58());
    this.keyService.createNamedKey({
      nickname: this.nickname,
      key: this.pubKey.toBase58(),
      primary: !this.hasPrimary(),
    });
    this.router.navigate(['/']);
  }
}
