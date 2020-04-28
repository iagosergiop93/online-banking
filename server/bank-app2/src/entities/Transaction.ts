
export enum TransactionType {
    DEPOSIT = 1, WITHDRAW = 2, TRANSFER = 3
}

export class Transaction {
    id: number;
    fromAcc: string;
    toAcc: string;
    type: TransactionType;
    value: number;
    _createdAt: string;
	_updatedAt: string;
}