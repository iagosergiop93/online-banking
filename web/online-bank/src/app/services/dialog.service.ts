import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFeedbackComponent } from '../dialogs/user-feedback/user-feedback.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

	constructor(public dialog: MatDialog) { }


	showFeedBackDialog(msg: string) {
		this.dialog.open(UserFeedbackComponent, {
			width: '300px',
			data: {text: msg}
		});
	}

	confirmDialog(msg: string) {
		this.dialog.open(UserFeedbackComponent, {
			width: '300px',
			data: {text: msg}
		});
	}

}
