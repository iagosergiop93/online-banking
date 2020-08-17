import config from "../resources/db-conn.json";
import configLocal from "../resources/db-conn-local.json";
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
    console.log('local',process.env.LOCAL);
    let conf = !!process.env.LOCAL && process.env.LOCAL == 'true' ? Object.create(configLocal) : Object.create(config);
    if(!!numOfConn && numOfConn > 0 && numOfConn < 1000) {
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