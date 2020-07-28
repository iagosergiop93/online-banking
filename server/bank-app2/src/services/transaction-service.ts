import { Transaction, TransactionType } from "../entities/Transaction";
import { Principal } from "../entities/Principal";
import { getAccountsByUserId } from "../daos/account-dao";
import { Account } from "../entities/Account";
import { BadRequest } from "../exceptions/bad-request";
import { startTransaction, getPoolConnection, commitQuery, releaseConnection } from "../daos/queryMaker";
import { getTransactionsByAccountNumber, insertTransaction } from "../daos/transaction-dao";
import { PoolConnection } from "mysql";

export class TransactionService {

    constructor() {}

    async getTransactionsByAccountNumber(accountNumber: string): Promise<Transaction[]> {
        console.log("In getTransactionsByAccountNumber");
        
        let transactions: Transaction[];
        let conn: PoolConnection;
        try {
            conn = await getPoolConnection();
            transactions = await getTransactionsByAccountNumber(conn, accountNumber);
        } catch(e) {
            throw e;
        } finally {
            if(!!conn) releaseConnection(conn);
        }

        return transactions;
    }

    async simpleTransaction(transaction: Transaction, principal: Principal): Promise<boolean> {
        let conn: PoolConnection;
        try {
            conn = await startTransaction();
            let account = await this.checkIfAccountBelongToUser(conn, principal.id, transaction.toAcc);
            // Process transaction
            account = this.processSimpleTransaction(transaction, account);
            account = await insertTransaction(conn, transaction, account);
            commitQuery(conn);
            releaseConnection(conn);

        } catch(e) {
            throw e;
        } finally {
            if(!!conn) conn.release();
        }

        return true;
    }

    async transfer(transaction: Transaction, principal: Principal): Promise<boolean> {
        let conn: PoolConnection;
        try {
            conn = await startTransaction();
            commitQuery(conn);
            //TODO
        } catch(e) {
            throw e;
        } finally {
            if(!!conn) conn.release();
        }
        
        return true;
    }

    private async checkIfAccountBelongToUser(conn: PoolConnection, userId: number, accNumber: string): Promise<Account> {
        let account;
        try {
            let accounts = await getAccountsByUserId(conn, userId);
            account = accounts.filter(acc => {
                return accNumber == acc.accountNumber;
            }).pop();
            if(!account) throw new BadRequest("Invalid Request");
        } catch(e) {
            throw e;
        }

        return account;
    }

    private processSimpleTransaction(transaction: Transaction, account: Account) {
        switch(transaction.type) {
            case TransactionType.DEPOSIT:
                account.balance = account.balance + transaction.value;
                break;
            case TransactionType.WITHDRAW:
                account.balance -= transaction.value;
                break;
            default:
                throw new BadRequest("Invalid request");
        }

        return account;
    }

    private processTransferTransaction(transaction: Transaction, fromAcc: Account, toAcc: Account) {
        return;
    }

    Factory(): TransactionService {
        return new TransactionService();
    }

}