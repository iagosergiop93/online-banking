import { User } from "../entities/User";
import { PoolConnection } from "mysql";
import { ServerError } from "../exceptions/server-error";
import { BadRequest } from "../exceptions/bad-request";
import { executeQueryInsideTransaction } from "./queryMaker";

export async function insertUser(conn: PoolConnection, user: User): Promise<User> {
    let sql = "INSERT INTO users (firstName, lastName, email, passwd, role) VALUES(?, ?, ?, ?, ?)";
    try {
        let resultsAndFields = await executeQueryInsideTransaction(conn, sql, [user.firstName, user.lastName, user.email, user.passwd, user.role]);
        user.id = resultsAndFields[0].insertId;
    } catch(err) {
        console.error(err);
        conn.rollback();
        if(err.code && err.code == "ER_DUP_ENTRY") return Promise.reject(new BadRequest("A user with this email already exist."));
        return Promise.reject(new ServerError("An unexpected error happened."));
    }

    return user;
}

export async function getUserByEmail(conn: PoolConnection, email: string): Promise<User> {
    let user: User;
    let sql = "SELECT * FROM users WHERE email = ?";
    try {
        let resultsAndFields: any[] = await executeQueryInsideTransaction(conn, sql, [email]);
        let results = resultsAndFields.shift();
        if(results.length == 0) throw new BadRequest("User not found.");
        user = mapResultSetToUsers(results).shift();
    } catch(e) {
        console.error(e);
        if(!!e.status && e.status == 400) {
            return Promise.reject(e);
        }
        return Promise.reject(new ServerError("An unexpected error happened."));
    }

    return user;
}

function mapResultSetToUsers(results: any[]) {
    let users = results.map(item => {
        if(item.id == undefined || item.id == 0 || !item.firstName || !item.lastName || !item.email || !item.passwd || !item.role) throw new ServerError("Invalid user found in Database");
        return new User(item.id, item.firstName, item.lastName, item.email, item.passwd, item.role);
    });
    return users;
}