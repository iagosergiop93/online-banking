import { Pool, Connection } from "mysql";
import { ServerError } from "../exceptions/server-error";
import { getPool } from "../utils/db-config";


export function getPoolConnection(): Promise<Connection> {
    let pool: Pool = getPool();
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            try {
                if(err) {
                    throw new ServerError("It was not possible to connect to DB");
                }
                resolve(conn);
            } catch (e) {
                reject(e);
            }
        })
    });
}

export function startTransaction(conn: Connection): Promise<Connection> {
    return new Promise((resolve, reject) => {
        try {
            conn.beginTransaction(err => {
                if(err) throw new ServerError("Error beginning transaction.");
                resolve(conn);
            });
        } catch (e) {
            reject(e);
        }
    });
}

export function executeQueryInsideTransaction(conn: Connection, sql: string, queryArgs: any[]) {
    return new Promise((resolve, reject) => {
        try {
            conn.query(sql, queryArgs, (err, results, values) => {
                if(err) {
                    conn.rollback();
                    throw new ServerError("An unexpected error happened.");
                }
                resolve([results, values]);
            });
        } catch(e) {
            reject(e);
        }
    });
}