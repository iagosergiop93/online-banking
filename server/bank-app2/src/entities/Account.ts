export enum AccountType {
	CHECKING = 1, SAVING = 2, JOINT = 3
}

export class Account {

	id: number;
	accountNumber: string;
	balance: number;
	type: AccountType;
	_createdAt: string;
	_updatedAt: string;
	_deletedAt: string;

	constructor(id: number,accountNumber: string, balance: number, type: AccountType) {
		this.id = id;
		this.accountNumber = accountNumber;
		this.balance = balance;
		this.type = type;
	}

}