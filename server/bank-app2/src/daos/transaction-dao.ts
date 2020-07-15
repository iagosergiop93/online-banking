import { Transaction } from "../entities/Transaction";
import { Pool } from "mysql";
import { ServerError } from "../exceptions/server-error";
import { Account } from "../entities/Account";
import { DAO } from "./DAO-interface";

export class TransactionDao implements DAO{

    pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    getAll(): Promise<Transaction[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<Transaction> {
        throw new Error("Method not implemented.");
    }
    insert(transaction: Transaction, account: Account): Promise<Account> {
        console.log("In insert transaction DAO: ", account.toString());
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, conn) => {
                try {
                    if(err) {
                        console.error("It was not possible to connect to DB");
                        throw new ServerError("It was not possible to connect to DB");
                    }
                    // Update account balance
                    let sql = "UPDATE accounts SET balance = ? WHERE accountNumber = ?";
                    conn.beginTransaction((err) => {
                        if(err) {
                            console.log("On updating account table", " error getting connection");
                            throw new ServerError("Error getting connection.");
                        }
                        conn.query(sql, [account.balance, account.accountNumber], 
                            (err, results, fields) => {
                                if(err) {
                                    console.error("On updating account table in DB",err);
                                    conn.rollback();
                                    reject(new ServerError("An unexpected error happened."));
                                }
                                console.log("After update", results, fields);
                                // Insert transaction in Transaction Table
                                sql = "INSERT INTO bank_transac (fromAcc, toAcc, type, value) VALUES(?, ?, ?, ?)";
                                conn.query(sql, [transaction.fromAcc, transaction.toAcc, transaction.type, transaction.value],
                                    (err, results, values) => {
                                        if(err) {
                                            console.error(err);
                                            conn.rollback();
                                            reject(new ServerError("Error getting connection."));
                                        }
                                        console.log("After insert transaction", results, values);
                                        conn.commit();
                                        resolve(account);
                                    }
                                );
                            });
                    });
                } catch(e) {
                    reject(e);
                }
                finally {
                    conn.release();
                }
            });
        });
    }

    
    delete(id: number): Promise<Transaction> {
        throw new Error("Method not implemented.");
    }

    getByAccountNumber(accountNumber: string): Promise<Transaction[]> {
        console.log("In getByUserId transaction DAO: ");
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, conn) => {
                try {
                    if(err) throw new ServerError("Error getting connection.");
                    let sql = "SELECT * FROM bank_transac WHERE fromAcc = ? OR toAcc = ?";
                    conn.query(sql, [accountNumber, accountNumber], (err, results, fields) => {
                        if(err) throw new ServerError("Failed while making the query.");
                        let transactions: Transaction[] = this.mapResultSetToTransactions(results);
                        resolve(transactions);
                    })
                } catch(e) {
                    reject(e);
                } finally {
                    conn.release();
                }
            });
        })
    }

    mapResultSetToTransactions(results: any[]) {
        console.log(results);
        return results;
    }

    
}