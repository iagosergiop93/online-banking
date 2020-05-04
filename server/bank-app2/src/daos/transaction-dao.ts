import { Transaction } from "../entities/Transaction";
import { Pool } from "mysql";
import { ServerError } from "../exceptions/server-error";
import { Account } from "../entities/Account";

export class TransactionDao {

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
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, conn) => {
                try {
                    if(err) throw new ServerError("It was not possible to connect to DB");
                    // Update account balance
                    // account.balance += transaction.value;
                    let sql = "UPDATE accounts SET balance = ? WHERE accountNumber = ?";
                    conn.beginTransaction((err) => {
                        if(err) throw new ServerError("Error getting connection.");
                        conn.query(sql, [account.balance, account.accountNumber], 
                            (err, results, fields) => {
                                if(err) {
                                    console.error(err);
                                    conn.rollback();
                                    reject(new ServerError("An unexpected error happened."));
                                }
                                // Insert transaction in Transaction Table
                                sql = "INSERT INTO transactions (fromAcc, toAcc, type, value) VALUES(?, ?, ?, ?)";
                                conn.query(sql, [transaction.fromAcc, transaction.toAcc, transaction.type, transaction.value],
                                    (err, results, values) => {
                                        if(err) {
                                            console.error(err);
                                            conn.rollback();
                                            reject(new ServerError("Error getting connection."));
                                        }
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
    update(obj: Transaction): Promise<Transaction> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<Transaction> {
        throw new Error("Method not implemented.");
    }


    
}