import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountType, ACCOUNT_DICT } from 'src/app/entities/account';

@Component({
  selector: 'app-account-type-info',
  templateUrl: './account-type-info.component.html',
  styleUrls: ['./account-type-info.component.scss']
})
export class AccountTypeInfoComponent implements OnInit {

	@Input() accountType: AccountType;
	@Output() createAcc = new EventEmitter<AccountType>();

	accDict = ACCOUNT_DICT;

	constructor() { }

	ngOnInit(): void {
	}

	createAccount() {
		this.createAcc.emit(this.accountType);
	}

}
