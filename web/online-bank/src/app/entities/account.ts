export enum AccountType {
	CHECKING = 1, SAVINGS = 2, JOINT = 3
}

export const ACCOUNT_DICT = {
	1: 'Checking',
	2: 'Savings',
	3: 'Joint'
}

export class Account {

	id: number;
	accountNumber: string;
	balance: number;
	type: AccountType;
	_createdAt: string;
	_updatedAt: string;
	_deletedAt: string;

	constructor(id: number,accountNumber: string, balance: number, type: AccountType, _createdAt?: string, _updatedAt?: string) {
		this.id = id;
		this.accountNumber = accountNumber;
		this.balance = balance;
		this.type = type;
		this._createdAt = _createdAt;
		this._updatedAt = _updatedAt;
	}

	toString() {
		return "id: " + this.id + " accountNumber: " + this.accountNumber + " balance: " + this.balance + " type: " + this.type;
	}

}