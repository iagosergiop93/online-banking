import { Component, OnInit } from '@angular/core';
import { ACCOUNT_DICT, Account } from '../../../entities/account';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

	accounts: Account[];

	dict = ACCOUNT_DICT;

	constructor() { }

	ngOnInit(): void {
	}

}
