import config from "../../resources/db-conn.json";
import mysql, { Pool } from "mysql";

export function getPool(numOfConn?: number): Pool {
    let conf = Object.create(config);
    if(numOfConn && numOfConn > 0 && numOfConn < 100) {
        conf.connectionLimit = numOfConn;
    }

    var pool = mysql.createPool(conf);

    pool.on('acquire', function (connection) {
        console.log('Connection %d acquired', connection.threadId);
    });
    
    pool.on('enqueue', function () {
        console.log('Waiting for available connection slot');
    });
    
    pool.on('release', function (connection) {
        console.log('Connection %d released', connection.threadId);
    });

    return pool;
}