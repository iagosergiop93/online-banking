import { Account } from "../entities/Account";
import { Connection } from "mysql";
import { ServerError } from "../exceptions/server-error";
import { BadRequest } from "../exceptions/bad-request";
import { executeQueryInsideTransaction } from "./queryMaker";

export async function getAllAccounts(conn: Connection): Promise<Account[]> {
    let accounts: Account[];
    try {
        let sql = "SELECT * FROM accounts";
        let resultsAndFields: any[] = await executeQueryInsideTransaction(conn, sql,[]);
        let accs = resultsAndFields.shift();
        if(accs.length == 0) throw new ServerError("Accounts not found");
        accounts = mapResultSetToAccounts(accs);
    } catch (error) {
        console.log(error);
        return Promise.reject(new ServerError("An unexpected error happened"));
    }

    return accounts;
}

export async function getAccountByAccountNumber(conn: Connection, accNumber: string): Promise<Account> {
    let account: Account;
    try {
        let sql = "SELECT * FROM accounts WHERE accountNumber = ?";
        let resultsAndFields: any[] = await executeQueryInsideTransaction(conn, sql, [accNumber]);
        let results = resultsAndFields.shift();
        if(results.length == 0) throw new BadRequest("User accounts not found.");
        account = mapResultSetToAccounts(results).shift();
    } catch (error) {
        console.error(error);
        return Promise.reject(new ServerError("An unexpected error happened."));
    }

    return account;
}

export async function getAccountsByUserId(conn: Connection, userId: number): Promise<Account[]> {
    let accounts: Account[];
    try {
        let sql = "SELECT acc.id, acc.accountNumber, acc.balance, acc.type " +
                                "FROM user_account AS us_acc " +
                                "INNER JOIN accounts AS acc " +
                                "ON us_acc.accNumber = acc.accountNumber " +
                                "WHERE us_acc.userId = ?";
        let resultsAndFields: any[] = await executeQueryInsideTransaction(conn, sql, [userId]);
        let results = resultsAndFields.shift();
        if(results.length == 0) throw new BadRequest("User accounts not found.");
        accounts = mapResultSetToAccounts(results);
    } catch (error) {
        console.error(error);
        return Promise.reject(new ServerError("An unexpected error happened."));
    }

    return accounts;
}

export async function insertAccount(conn: Connection, account: Account): Promise<Account> {
    try {
        let sql = "INSERT INTO accounts (accountNumber, balance, type) VALUES(?, 0.0, ?)";
        let resultsAndFields: any[] = await executeQueryInsideTransaction(conn, sql, [account.accountNumber, account.type]);
        let results = resultsAndFields.shift();
        account.id = results.insertId;
    } catch (error) {
        console.error(error);
        return Promise.reject(new ServerError("An unexpected error happened."));
    }

    return account;
}

export async function updateAccount(conn: Connection, account: Account): Promise<Account> {
    try {
        let sql = "UPDATE accounts SET balance = ? WHERE accountNumber = ?";
        await executeQueryInsideTransaction(conn, sql, [account.balance, account.accountNumber]);
        
    } catch (error) {
        console.error(error);
        return Promise.reject(new ServerError("An unexpected error happened."));
    }

    return account;
}

export async function linkUserToAccount(conn: Connection, userId: number, accNumber: string): Promise<void> {
    try {
        let sql = "INSERT INTO user_account VALUES(?, ?)";
        let resultsAndFields: any[] = await executeQueryInsideTransaction(conn, sql, [userId, accNumber]);
    } catch (error) {
        console.error(error);
        return Promise.reject(new ServerError("An unexpected error happened."));
    }
}

function mapResultSetToAccounts(results: any[]) {
    let accounts = results.map(item => {
        // if(item.id == undefined || item.balance == undefined || item.type == undefined) {
        //     throw new ServerError("Invalid account found in Database");
        // }
        return new Account(item.id, item.accountNumber, parseFloat(item.balance), item.type, parseFloat(item.interest), item._createdAt, item._updatedAt);
    });
    return accounts;
}