import { AccountType } from "./AccountType";

export class Account {

	id: number;
	balance: number;
	type: AccountType;

	constructor(id: number, balance: number, type: AccountType) {
		this.id = id;
		this.balance = balance;
		this.type = type;
	}

}