import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { KeyService } from '../database.service';
import { InstantMessageService } from '../instant-message.service';
import { InstantMessage } from '../InstantMessage.model';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  messages: InstantMessage[] = [];
  sub: Subscription;
  nextMessage: string = '';
  usernameMapping: object = {};
  currentSignature: string;
  selfId: string;
  constructor(
    private messenger: InstantMessageService,
    private router: Router,
    private keyService: KeyService,
    public afAuth: AngularFireAuth 
  ) {}

  ngOnInit(): void {
    this.currentSignature = this.router.url.substring(4);
    this.sub = this.messenger
      .getRelevantMessages(this.currentSignature)
      .subscribe((messages) => {
        this.messages = messages;
        for (let msg of this.messages) {
          if (!(msg.uid in this.usernameMapping)){
            this.keyService.getUserAccountFromUID(msg.uid).subscribe(acct => this.usernameMapping[msg.uid] = acct.username)
          }
        }        
      });
    this.afAuth.authState.subscribe(user => this.selfId = user.uid);
  }

  lookupUsername(uid: string) {
    return this.usernameMapping[uid];
  }

  sendMessage() {
    this.messenger.sendMessage({
      text: this.nextMessage,
      timestamp: Date.now(),
      signature: this.currentSignature,
    });
    this.nextMessage = "";
  }
}
