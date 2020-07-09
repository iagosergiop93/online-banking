import { Transaction } from "../entities/Transaction";
import { Pool } from "mysql";
import { ServerError } from "../exceptions/server-error";
import { Account } from "../entities/Account";
import { DAO } from "./DAO-interface";
import { getPool } from "../utils/db-config";
import { Factory } from "../interfaces/Factory";

export class TransactionDao implements DAO, Factory{

    pool: Pool = getPool();

    constructor() {}

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
                                    });
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


    Factory() {
        return new TransactionDao();
    }
    
}