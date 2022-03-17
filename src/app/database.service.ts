import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import { Observable, ObservableLike, of } from 'rxjs';
import { switchMap, map, tap, mapTo } from 'rxjs/operators';
import { NamedKey } from './NamedKey.model';
import { UserAccount } from './UserAccount.model';

@Injectable({
  providedIn: 'root',
})
export class KeyService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  // Create/update username for current user
  async setUsername(username: string) {
    const user = await this.afAuth.currentUser;
    return this.db
      .collection('usernames')
      .doc(user.uid)
      .set({ username: username });
  }

  // Create a new key
  async createNamedKey(data: NamedKey) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('publicKeys').add({
      ...data,
      uid: user.uid,
    });
  }

  // Delete key
  deleteKey(keyID: string) {
    return this.db.collection('publicKeys').doc(keyID).delete();
  }

  updateKey(keyId: string, data: object) {
    return this.db
      .collection('publicKeys')
      .doc(keyId)
      .update({ ...data });
  }

  getUserID(username: string): Promise<any> {
    return this.db
      .collection('usernames', (ref) => ref.where('username', '==', username))
      .get()
      .toPromise();
  }
  getUserAccountFromUID(uid: string): Observable<UserAccount> {
    return this.db.collection<UserAccount>('usernames').doc(uid).valueChanges();
  }
  searchAccounts(term: string): Observable<UserAccount[]> {
    if (!term.trim()) {
      // No search term -> return empty array
      return of([]);
    }
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<UserAccount>('usernames', (ref) =>
              ref
                .where('username', '>=', term)
                .where('username', '<=', term + '\uf8ff')
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }

  getUserName(): Observable<UserAccount> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<UserAccount>('usernames')
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }
  getMyUserName(): Observable<UserAccount> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<UserAccount>('usernames')
            .doc(user.uid).valueChanges();
        } else {
          return [];
        }
      })
    );
  }
  getPrimaryKeyByUID(uid: string): Observable<NamedKey> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<NamedKey>('publicKeys', (ref) =>
              ref.where('uid', '==', uid).where('primary', '==', true)
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }

  // Get keys owned by user
  getUserKeys(): Observable<NamedKey[]> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<NamedKey>('publicKeys', (ref) =>
              ref.where('uid', '==', user.uid).orderBy('nickname')
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }

  // Convert public key to username
  findMatchingKeys(searchKey: string): Observable<NamedKey[]> {
    return this.db
      .collection<NamedKey>('publicKeys', (ref) =>
        ref.where('key', '==', searchKey)
      )
      .valueChanges({ idField: 'id' });
  }

  getUserNameFromKey(key: string): Observable<string> {
    return this.findMatchingKeys(key).pipe(
      switchMap((keys) => {
        if (keys) {
          if (keys.length > 0) {
            return this.getUserAccountFromUID(keys[0].uid).pipe(
              map((acct) => acct.username)
            );
          }
        }
        return ['Unknown'];
      })
    );
  }
}
