import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';
import { DialogService } from 'src/app/services/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

	constructor(public accountService: AccountsService,
				public router: Router,
				public dialogService: DialogService) { }

	ngOnInit(): void {
	}

	createAccount(accType) {
		this.accountService.createAccount(accType).subscribe(
			(res) => {
				this.dialogService.showFeedBackDialog("Your account was successfully created");
				this.router.navigate(['/dashboard']);
			},
			(err) => {
				this.dialogService.showFeedBackDialog(err.description);
			}
		);
		
	}

}
