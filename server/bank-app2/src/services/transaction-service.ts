import { Transaction, TransactionType } from "../entities/Transaction";
import { Principal } from "../entities/Principal";
import { getAccountsByUserId, getAccountByAccountNumber, updateAccount } from "../daos/account-dao";
import { Account } from "../entities/Account";
import { BadRequest } from "../exceptions/bad-request";
import { startTransaction, getPoolConnection, commitQuery, releaseConnection } from "../daos/queryMaker";
import { getTransactionsByAccountNumber, insertTransaction } from "../daos/transaction-dao";
import { PoolConnection } from "mysql";
import { Logger } from "pino";
import { getPinoLogger } from "../utils/logger";

export class TransactionService {

    logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    async getTransactionsByAccountNumber(accountNumber: string): Promise<Transaction[]> {
        this.logger.debug("In transactionService getByAccountNumber(" + accountNumber + ")");

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
        this.logger.debug("In transactionService simpleTransaction(" + transaction + ", " +  principal + ")");

        let conn: PoolConnection;
        try {
            conn = await startTransaction();
            let account = await this.checkIfAccountBelongToUser(conn, principal.id, transaction.toAcc);
            // Process transaction
            account = this.processSimpleTransaction(transaction, account);
            account = await updateAccount(conn, account);
            await insertTransaction(conn, transaction);
            commitQuery(conn);

        } catch(e) {
            if(!!conn) {
                conn.rollback();
            }
            throw e;
        } finally {
            if(!!conn) releaseConnection(conn);;
        }

        return true;
    }

    async transfer(transaction: Transaction, principal: Principal): Promise<boolean> {
        this.logger.debug("In transactionService transfer(" + transaction + ", " +  principal + ")");
        let conn: PoolConnection;
        try {
            conn = await startTransaction();
            let fromAcc = await this.checkIfAccountBelongToUser(conn, principal.id, transaction.fromAcc);
            let toAcc = await getAccountByAccountNumber(conn, transaction.toAcc);
            this.processTransferTransaction(transaction, fromAcc, toAcc);
            fromAcc = await updateAccount(conn, fromAcc);
            toAcc = await updateAccount(conn, toAcc);
            await insertTransaction(conn, transaction);
            commitQuery(conn);
        } catch(e) {
            if(!!conn) {
                conn.rollback();
            }
            throw e;
        } finally {
            if(!!conn) releaseConnection(conn);
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
        const value = transaction.value;
        fromAcc.balance -= value;
        toAcc.balance += value;
    }

    Factory(log?: Logger): TransactionService {
        const logger = !!log ? log : getPinoLogger();
        return new TransactionService(logger);
    }

}