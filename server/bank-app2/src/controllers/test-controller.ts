import { Router } from "express";
import { getPoolConnection, startTransaction, executeQueryInsideTransaction } from "../daos/queryMaker";

export function testController() {
    let router = Router();

    router.post("/db-api", async (req, res) => {
        try {
            let conn = await startTransaction();
            let sql = "INSERT INTO users (firstName, lastName, email, passwd, role) VALUES(?, ?, ?, ?, ?)";
            let queryArgs = ["Sergio", "Mendes", "sergio@gmail.com", "1234", 1]
            executeQueryInsideTransaction(conn, sql, queryArgs)
            .then((results) => {
                console.log(results);
                conn.commit();
                res.send(results);
            }).catch(e => { 
                res.status(e.status).send(e);
            });
        } catch (e) {
            res.status(e.status).send(e);
        }
    });

    return router;
}