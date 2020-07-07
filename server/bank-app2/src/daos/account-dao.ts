import { DAO } from "./DAO-interface";
import { Account } from "../entities/Account";
import { Pool } from "mysql";
import { ServerError } from "../exceptions/server-error";
import { BadRequest } from "../exceptions/bad-request";

export class AccountDao implements DAO<Account> {

    pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    getAll(): Promise<Account[]> {
        throw new Error("Method not implemented.");
    }

    getById(id: number): Promise<Account> {
        throw new Error("Method not implemented.");
    }

    insert(obj: Account): Promise<Account> {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, conn) => {
                try {
                    if(err) throw new ServerError("Error getting connection.");
                    let sql = "INSERT INTO accounts (accountNumber, balance, type) VALUES(?, 0.0, ?)";
                    conn.query(sql, [obj.accountNumber, obj.type], (err, results, fields) => {
                        if(err) throw new ServerError("Failed while making the query.");
                        obj.id = results.insertId;
                        resolve(obj);
                    });
                } catch(e) {
                    reject(e);
                } finally {
                    conn.release();
                }
            });
        });
    }

    update(obj: Account): Promise<Account> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<Account> {
        throw new Error("Method not implemented.");
    }

    getAccountsByUserId(userId: number): Promise<Account[]> {
        console.log("In UserDao getting accounts by user id");
        return new Promise((resolve, reject) => {
            let accounts: Account[] = [];
            this.pool.getConnection((err, conn) => {
                try {
                    if(err) throw new ServerError("Error getting connection.");
                    let sql = "SELECT acc.id, acc.accountNumber, acc.balance, acc.type " +
                                "FROM user_account AS us_acc " +
                                "INNER JOIN accounts AS acc " +
                                "ON us_acc.accNumber = acc.accountNumber " +
                                "WHERE us_acc.userId = ?";
                    conn.query(sql, [userId], (err, results, fields) => {
                        if(err) throw new ServerError("Failed while making the query.");
                        //console.log(results);
                        if(results.length == 0) throw new BadRequest("User accounts not found.");
                        accounts = this.mapResultSetToAccounts(results);
                        resolve(accounts);
                    });
                } catch(e) {
                    reject(e);
                } finally {
                    conn.release();
                }
            });
        });
    }

    private mapResultSetToAccounts(results: any[]) {
        let accounts = results.map(item => {
            if(item.id == undefined || item.balance == undefined || item.type == undefined) throw new ServerError("Invalid account found in Database");
            return new Account(item.id, item.accountNumber, item.balance, item.type, item._createdAt, item._updatedAt);
        });
        return accounts;
    }

}