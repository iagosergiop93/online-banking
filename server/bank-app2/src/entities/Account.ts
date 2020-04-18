import { AccountType } from "./AccountType";

export class Account {

	id: number;
	accountNumber: string;
	balance: number;
	type: AccountType;

	constructor(id: number,accountNumber: string, balance: number, type: AccountType) {
		this.id = id;
		this.accountNumber = accountNumber;
		this.balance = balance;
		this.type = type;
	}

}