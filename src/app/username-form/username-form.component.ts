import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeyService } from '../database.service';
import { SnackbarService } from '../snackbar.service';

@Component({
  selector: 'app-username-form',
  templateUrl: './username-form.component.html',
  styleUrls: ['./username-form.component.scss'],
})
export class UsernameFormComponent implements OnInit {
  hasUsername: boolean = false;
  currentUsername: string = '';
  username: string;
  constructor(
    private databaseService: KeyService,
    public snackService: SnackbarService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.databaseService.getMyUserName().subscribe((accts) => {
      if (accts !== undefined) {
        this.hasUsername = true;
        this.currentUsername = accts.username;
      } else {
        this.currentUsername = '';
        this.hasUsername = false;
      }
      
    });
  }

  saveName() {
    if (this.username.length < 6) {
      this.snackService.generalError('6 characters minimum', 'OK');
      return;
    }
    if (!/^[A-Za-z0-9-]*$/.test(this.username)) {
      this.snackService.generalError('Only letters, numbers, and dashes', 'OK');
      return;
    }
    this.databaseService
      .getUserID(this.username)
      .catch((err) => {
        this.snackService.generalError(err, 'Yikes');
        return;
      })
      .then((users) => {
        if (users.docs.length > 0) {
          this.snackService.generalError(
            'Sorry. That name is already taken.',
            'OK'
          );
          return;
        } else {
          this.databaseService.setUsername(this.username);
          this.router.navigate(['/']);
        }
      });
  }
}
