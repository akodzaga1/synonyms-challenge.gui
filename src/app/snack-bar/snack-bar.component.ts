import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'info-snack-bar',
  template: '<div class="snack-bar" fxLayout="row"><mat-icon fxFlex="10">info</mat-icon><span fxFlex="80"> {{data}}</span><button mat-icon-button style="margin: -9px;" (click)="snackBarRef.dismiss();"><mat-icon>clear</mat-icon></button></div>',
  styleUrls: ['./snack-bar.component.css']
})
export class InfoSnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any, public snackBarRef: MatSnackBarRef<InfoSnackbarComponent>
  ) { }
}

@Component({
  selector: 'success-snack-bar',
  template: '<div class="snack-bar" fxLayout="row"><mat-icon fxFlex="10">done</mat-icon><span fxFlex="80"> {{data}}</span><button mat-icon-button style="margin: -9px;" (click)="snackBarRef.dismiss();"><mat-icon>clear</mat-icon></button></div>',
  styleUrls: ['./snack-bar.component.css']
})
export class SuccessSnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any, public snackBarRef: MatSnackBarRef<SuccessSnackbarComponent>
  ) { }
}

@Component({
  selector: 'error-snack-bar',
  template: '<div class="snack-bar" fxLayout="row"><mat-icon fxFlex="10">warning</mat-icon><span fxFlex="80"> {{data}}</span><button mat-icon-button style="margin: -9px;" (click)="snackBarRef.dismiss();"><mat-icon>clear</mat-icon></button></div>',
  styleUrls: ['./snack-bar.component.css']
})
export class ErrorSnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any, public snackBarRef: MatSnackBarRef<ErrorSnackbarComponent>
  ) { }
}