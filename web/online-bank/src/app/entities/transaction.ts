
export enum TransactionType {
    DEPOSIT = 1, WITHDRAW = 2, TRANSFER = 3
}

export const TRANSACTION_DICT = {
    1: "Deposit",
    2: "Withdraw",
    3: "Transfer"
}

export class Transaction {
    id: number;
    fromAcc: string;
    toAcc: string;
    type: TransactionType;
    value: number;
    _createdAt: string;
    _updatedAt: string;
    
    constructor(from: string, to: string, type: TransactionType, value: number) {
        this.fromAcc = from;
        this.toAcc = to;
        this.type = type;
        this.value = value;
    }

    toString() {
        return "id: " + this.id + ", toAcc: " + this.toAcc + ", type: " + this.type + ", value: " + this.value;
    }

}