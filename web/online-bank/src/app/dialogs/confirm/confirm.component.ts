import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

	constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
		           @Inject(MAT_DIALOG_DATA) public data: {text: string}) { }

	ngOnInit(): void {
	}

	closeDialog(result) {
		this.dialogRef.close(result);
	}
}
