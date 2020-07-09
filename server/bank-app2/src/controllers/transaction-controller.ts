import { Router, Request, Response } from "express";
import { BadRequest } from "../exceptions/bad-request";
import { Principal } from "../entities/Principal";
import { Transaction, TransactionType } from "../entities/Transaction";
import { TransactionService } from "../services/transaction-service";
import { validateTransaction } from "../utils/validator";
import { ServerError } from "../exceptions/server-error";
import { Container } from "../container/container";

export function transactionController(container: Container) {

    let transactionService = container.getSingleton(TransactionService)
    let router = Router();

    router.post("/simple", async (req: Request, res: Response) => {
        try {
            // Validate Transaction
            validateTransaction(req);
            if((req.body.type != TransactionType.DEPOSIT && req.body.type != TransactionType.WITHDRAW) || req.body.fromAcc != req.body.toAcc) throw new BadRequest("Invalid Request");
            // Check if user is authorized
            // Get principal
            if(!res.locals.authorization) throw new BadRequest("Missing fields");
            let principal: Principal = JSON.parse(res.locals.authorization.data);
            if(!principal.id || principal.id == 0) throw new BadRequest("Missing fields");
            let transaction: Transaction = new Transaction(req.body.fromAcc,req.body.toAcc, req.body.type, req.body.value);

            let worked = await transactionService.simpleTransaction(transaction, principal);
            if(!worked) throw new ServerError("Something bad happened");
            res.status(200).send("Transaction was successful");
        } catch(e) {
            res.status(e.status).send(e);
        }
    });

    router.post("/transfer", async (req: Request, res: Response) => {
        try {
            // Validate Transaction
            validateTransaction(req);
            if(req.body.type != TransactionType.TRANSFER || req.body.fromAcc == req.body.toAcc) throw new BadRequest("Invalid Request");
            // Check if user is authorized
            // Get principal
            if(!res.locals.authorization) throw new BadRequest("Missing fields");
            let principal: Principal = JSON.parse(res.locals.authorization.data);
            if(!principal.id || principal.id == 0) throw new BadRequest("Missing fields");
            let transaction: Transaction = new Transaction(req.body.fromAcc,req.body.toAcc, req.body.type, req.body.value);
            
            let worked = await transactionService.transfer(transaction, principal);
            if(!worked) throw new ServerError("Something bad happened");
            res.status(200).send("Transaction was successful");
        } catch(e) {
            res.status(e.status).send(e);
        }
    });

    return router;
}