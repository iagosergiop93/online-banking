import { DAO } from "./DAO-interface";
import { User } from "../entities/User";
import { Pool } from "mysql";
import { Account, AccountType } from "../entities/Account";
import { ServerError } from "../exceptions/server-error";
import { BadRequest } from "../exceptions/bad-request";
import { createAccountUUID } from "../utils/randomNumGen";

export class UserDao implements DAO<User> {

    pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    getAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    getById(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }

    insert(obj: User): Promise<User> {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, conn) => {
                try {
                    if(err) throw new ServerError("It was not possible to connect to DB");
                    // Insert new User in users table
                    let sql = "INSERT INTO users (firstName, lastName, email, passwd, role) VALUES(?, ?, ?, ?, ?)";
                    conn.beginTransaction((error) => {
                        if(error) throw new ServerError("Error getting connection.");
                        conn.query(sql, [obj.firstName, obj.lastName, obj.email, obj.passwd, obj.role],
                            (err, results, fields) => {
                                if(err) {
                                    console.error(err);
                                    conn.rollback();
                                    if(err.code && err.code == "ER_DUP_ENTRY") reject(new BadRequest("A user with this email already exist."));
                                    else reject(new ServerError("An unexpected error happened."));
                                    return;
                                }
                                obj.id = results.insertId;
        
                                // Create new account
                                console.log("Creating new account " + AccountType.CHECKING);
                                let accNumber = createAccountUUID();
                                sql = "INSERT INTO accounts (accountNumber, balance, type) VALUES(?, 0.0, " + AccountType.CHECKING + ")";
                                conn.query(sql, [accNumber], (err2, results2, fields2) => {
                                    if(err2) {
                                        console.error(err2);
                                        conn.rollback();
                                        reject(new ServerError("Error inserting in table accounts"));
                                        return;
                                    }
                                    
                                    // Insert into table user_account
                                    console.log("Creating middle table entry with (userId, accNumber) = (" + obj.id + ", " + results2.insertId + ")");
                                    sql = "INSERT INTO user_account VALUES(?, ?)"
                                    conn.query(sql, [obj.id, accNumber], (err3, results3, fields3) => {
                                        if(err3) {
                                            console.error(err3);
                                            conn.rollback();
                                            reject(new Error("Error inserting in table user_account"));
                                            return;
                                        }
                                        conn.commit();
                                        resolve(obj);
                                    } )
                                });
                            });
                    });
                } catch(e) {
                    console.log("In catch userDao");
                    reject(e);
                } finally {
                    conn.release();
                }
            });
        });
    }

    update(obj: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }

    getByEmail(email: string): Promise<User> {
        console.log("In UserDao getting user by email");
        return new Promise((resolve, reject) => {
            let user: User;
            this.pool.getConnection((err, conn) => {
                try {
                    if(err) throw new ServerError("Error getting connection.");
                    let sql = "SELECT * FROM users WHERE email = ?";
                    conn.query(sql, [email], (err, results, fields) => {
                        try {
                            if(err) {
                                console.log(err);
                                throw new ServerError("Failed while making the query.");
                            }
                            // console.log(results);
                            if(results.length == 0) throw new BadRequest("User not found.");
                            user = this.mapResultSetToUsers(results).shift();
                            resolve(user);
                        } catch(e) {
                            reject(e);
                        }
                    });
                } catch(e) {
                    reject(e);
                } finally {
                    conn.release();
                }
            });
        });
    }

    private mapResultSetToUsers(results: any[]) {
        let users = results.map(item => {
            if(item.id == undefined || item.id == 0 || !item.firstName || !item.lastName || !item.email || !item.passwd || !item.role) throw new ServerError("Invalid user found in Database");
            return new User(item.id, item.firstName, item.lastName, item.email, item.passwd, item.role);
        });
        return users;
    }

}