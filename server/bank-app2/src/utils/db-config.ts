import config from "../../resources/db-conn.json";
import mysql, { Pool } from "mysql";

var SINGLE_POOL: Pool;

export function getPool(numOfConn?: number): Pool {
    if(poolExists()) {
        return SINGLE_POOL;
    }

    let conf = getPoolConfig(numOfConn);
    createPool(conf);
    
    return SINGLE_POOL;
}

function poolExists() {
    return !!SINGLE_POOL;
}

function getPoolConfig(numOfConn?: number): any {
    let conf = Object.create(config);
    if(!!numOfConn && numOfConn > 0 && numOfConn < 100) {
        conf.connectionLimit = numOfConn;
    }
    return conf;
}

function createPool(conf: any): void {
    try {
        SINGLE_POOL = mysql.createPool(conf);
        addPoolEvents();
    } catch(e) {
        throw e;
    }
}

function addPoolEvents() {
    SINGLE_POOL.on('acquire', function (connection) {
        console.log('Connection %d acquired', connection.threadId);
    });
    SINGLE_POOL.on('enqueue', function () {
        console.log('Waiting for available connection slot');
    });
    SINGLE_POOL.on('release', function (connection) {
        console.log('Connection %d released', connection.threadId);
    });
}