import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { KeyService } from '../database.service';
import { NamedKey } from '../NamedKey.model';

@Component({
  selector: 'app-key-importer',
  templateUrl: './key-importer.component.html',
  styleUrls: ['./key-importer.component.scss'],
})
export class KeyImporterComponent implements OnInit {
  nickname: string;
  address: string;
  keys: NamedKey[];
  sub: Subscription;

  constructor(private keyService: KeyService, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.keyService
      .getUserKeys()
      .subscribe((keys) => (this.keys = keys));
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  hasPrimary() {
    return this.keys.some((key) => key.primary);
  }
  async saveKey() {
    // console.log(this.newAccount);
    // console.log(this.pubKey.toBase58());
    this.keyService.createNamedKey({
      nickname: this.nickname,
      key: this.address,
      primary: !this.hasPrimary(),
    });
    this.router.navigate(['/']);
  }
}
