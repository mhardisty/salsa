import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { KeyService } from '../database.service';
import { NamedKey } from '../NamedKey.model';
import { UserAccount } from '../UserAccount.model';

@Component({
  selector: 'app-find-friend',
  templateUrl: './find-friend.component.html',
  styleUrls: ['./find-friend.component.scss'],
})
export class FindFriendComponent implements OnInit {
  friend$!: Observable<UserAccount[]>;
  friendAccount: UserAccount;
  @Output() targetKey = new EventEmitter<string>();
  @Output() friendFound = new EventEmitter<string>();

  private searchTerms = new Subject<string>();
  constructor(public keyService: KeyService) {}

  ngOnInit(): void {
    this.friend$ = this.searchTerms.pipe(
      // wait before searching
      debounceTime(300),

      // ignore if same as previous
      distinctUntilChanged(),

      // switch to new search observable when term changes
      switchMap((term: string) => this.keyService.searchAccounts(term))
    );
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  select(account: UserAccount): void {
    this.friendAccount = account;
    this.keyService
      .getPrimaryKeyByUID(this.friendAccount.id)
      .subscribe((keyList) => {
        const friendKey = keyList[0];
        this.targetKey.emit(friendKey.key);
        this.friendFound.emit(this.friendAccount.username);
      });
  }
  clearFriend() {
    this.friendAccount = null;
  }
}
