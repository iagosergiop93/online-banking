import { Transaction } from "../entities/Transaction";
import { PoolConnection } from "mysql";
import { Account } from "../entities/Account";
import { executeQueryInsideTransaction } from "./queryMaker";
import { ServerError } from "../exceptions/server-error";

export async function insertTransaction(conn: PoolConnection, transaction: Transaction, account: Account): Promise<Account> {
    try {
        let sql = "UPDATE accounts SET balance = ? WHERE accountNumber = ?";
        await executeQueryInsideTransaction(conn, sql, [account.balance, account.accountNumber]);
        
        sql = "INSERT INTO bank_transac (fromAcc, toAcc, type, value) VALUES(?, ?, ?, ?)";
        await executeQueryInsideTransaction(conn, sql, [transaction.fromAcc, transaction.toAcc, transaction.type, transaction.value]);

    } catch (error) {
        return Promise.reject(new ServerError("An unexpected error happened."));
    }

    return account;
}

export async function getTransactionsByAccountNumber(conn: PoolConnection, accountNumber: string): Promise<Transaction[]> {
    console.log('In getTransactionsByAccountNumber', 'accountNumber = ' + accountNumber);
    
    let transactions: Transaction[];
    try {
        let sql = "SELECT * FROM bank_transac WHERE fromAcc = ? OR toAcc = ? ORDER BY _createdAt DESC";
        let resultAndFields = await executeQueryInsideTransaction(conn, sql, [accountNumber, accountNumber]);
        let results = resultAndFields.shift();
        transactions = mapResultSetToTransactions(results);
    } catch (error) {
        return Promise.reject(new ServerError("An unexpected error happened."));
    }

    return transactions;
}

export function mapResultSetToTransactions(results: any[]) {
    console.log(results);
    return results;
}