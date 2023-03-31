import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }
  
  error(message: string) {
    this.snackBar.open(message, undefined, {
      panelClass:['snackbar-error']
    });
  }

  success(message:string) {
    this.snackBar.open(message, undefined, {
      panelClass:['snackbar-success']
    });
  }

  message(message:string, action:string, config:any):MatSnackBarRef<any> {
    return this.snackBar.open(message, action, config);
  }
}
