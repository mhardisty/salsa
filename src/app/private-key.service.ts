import { Injectable } from '@angular/core';
import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import * as Bip39 from 'bip39';

@Injectable({
  providedIn: 'root',
})
export class PrivateKeyService {
  constructor() {}

  saveKey(pubKey: string, words: string) {
    window.localStorage.setItem(pubKey, words);
  }

  getKeys(): string[] {
    return Object.keys(localStorage);
  }

  getWords(key: string) {
    return localStorage.getItem(key);
  }

  getKeypairFromKey(key: string) {
    let words = this.getWords(key);
    const seed = Bip39.mnemonicToSeedSync(words);
    return Keypair.fromSeed(seed.slice(0, 32));
  }
}
