import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  generalError(message: string, dismiss: string) {
    this.snackBar.open(message, dismiss, { duration: 5000 });
  }

  errorWithRouter(message: string, dismiss: string, route: string[]) {
    this.snackBar.open(message, dismiss, { duration: 5000 });
    return this.snackBar._openedSnackBarRef
      .onAction()
      .pipe(tap((_) => this.router.navigate(route)))
      .subscribe();
  }

  authError() {
    this.snackBar.open('Please login first', 'OK', {
      duration: 5000
    });

    return this.snackBar._openedSnackBarRef
      .onAction()
      .pipe(
        tap(_ =>
          this.router.navigate(['/login'])
        )
      )
      .subscribe();
  }
}
