export enum AccountType {
	CHECKING = 1, SAVINGS = 2, JOINT = 3
}

export class Account {

	id: number;
	accountNumber: string;
	balance: number;
	type: AccountType;
	interest: number;
	_createdAt: string;
	_updatedAt: string;
	_deletedAt: string;

	constructor(id: number,accountNumber: string, balance: number, type: AccountType, interest?: number, _createdAt?: string, _updatedAt?: string) {
		this.id = id;
		this.accountNumber = accountNumber;
		this.balance = balance;
		this.type = type;
		this.interest = interest;
		this._createdAt = _createdAt;
		this._updatedAt = _updatedAt;
	}

	toString() {
		return "id: " + this.id + " accountNumber: " + this.accountNumber + " balance: " + this.balance + " type: " + this.type;
	}

}