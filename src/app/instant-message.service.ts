import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { InstantMessage } from './InstantMessage.model';

@Injectable({
  providedIn: 'root',
})
export class InstantMessageService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  // Create a new key
  async sendMessage(data: InstantMessage) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('messages').add({
      ...data,
      uid: user.uid,
    });
  }

  // Get keys owned by user
  getRelevantMessages(signature: string): Observable<InstantMessage[]> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<InstantMessage>('messages', (ref) =>
              ref.where('signature', '==', signature).orderBy('timestamp')
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }
}
