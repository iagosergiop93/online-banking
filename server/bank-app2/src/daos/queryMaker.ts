import { Pool, Connection, PoolConnection } from "mysql";
import { ServerError } from "../exceptions/server-error";
import { getPool } from "../utils/db-config";


export function getPoolConnection(): Promise<PoolConnection> {
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

export function startTransaction(): Promise<PoolConnection> {
    return new Promise((resolve, reject) => {
        getPoolConnection()
        .then((conn) => {
            conn.beginTransaction(err => {
                if(err) throw new ServerError("Error beginning transaction.");
                resolve(conn);
            });
        })
        .catch(e => {
            reject(e);
        })
    });
}

export function executeQueryInsideTransaction(conn: Connection, sql: string, queryArgs: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
        try {
            conn.query(sql, queryArgs, (err, results, values) => {
                if(err) {
                    conn.rollback();
                    reject(err);
                }
                resolve([results, values]);
            });
        } catch(e) {
            reject(e);
        }
    });
}

export function commitQuery(conn: Connection) {
    conn.commit();
}

export function releaseConnection(conn: PoolConnection) {
    getPool().releaseConnection(conn);
}