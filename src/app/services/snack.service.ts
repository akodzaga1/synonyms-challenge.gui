import { Injectable } from "@angular/core";
import { MatSnackBarConfig, MatSnackBar } from "@angular/material/snack-bar";
import { ErrorSnackbarComponent, SuccessSnackbarComponent, InfoSnackbarComponent } from '../snack-bar/snack-bar.component';
@Injectable()
export class SnackService {
  constructor(public snackBar: MatSnackBar) {

  }
  showSnack(message: string | string[], type: string = 'Info', duration: number = 3000) {
    let config = new MatSnackBarConfig();
    config.duration = duration;

    config.data = message;
    if (type == "Error") {
      config.panelClass = ['snackError', 'font-roboto'];
      return this.snackBar.openFromComponent(ErrorSnackbarComponent, config);
    }
    else if (type == "Success") {
      config.panelClass = ['snackSuccess', 'font-roboto'];
      return this.snackBar.openFromComponent(SuccessSnackbarComponent, config);
    }
    else {
      config.panelClass = ['snackInfo', 'font-roboto'];
      return this.snackBar.openFromComponent(InfoSnackbarComponent, config);
    }
  }
}