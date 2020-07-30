import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.scss']
})
export class UserFeedbackComponent implements OnInit {

	constructor(public dialogRef: MatDialogRef<UserFeedbackComponent>,
		           @Inject(MAT_DIALOG_DATA) public data: {text: string}) { }

	ngOnInit(): void {
	}

	closeDialog() {
		this.dialogRef.close();
	}

}
