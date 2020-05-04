import { Router, Request, Response } from "express";
import { BadRequest } from "../exceptions/bad-request";
import { Principal } from "../entities/Principal";
import { Transaction, TransactionType } from "../entities/Transaction";
import { TransactionService } from "../services/transaction-service";
import { validateTransaction } from "../utils/validator";

export function transactionController(transactionService: TransactionService) {
    let router = Router();

    router.post("/deposit", async (req: Request, res: Response) => {
        try {
            // Validate Transaction
            validateTransaction(req);
            if(req.body.type != TransactionType.DEPOSIT || req.body.fromAcc != req.body.toAcc) throw new BadRequest("Invalid Request");
            // Check if user is authorized
            // Get principal
            if(!res.locals.authorization) throw new BadRequest("Missing fields");
            let principal: Principal = JSON.parse(res.locals.authorization.data);
            if(!principal.id || principal.id == 0) throw new BadRequest("Missing fields");
            let transaction: Transaction = new Transaction(req.body.fromAcc,req.body.toAcc, req.body.type, req.body.value);

            let worked = await transactionService.deposit(transaction, principal);

        } catch(e) {
            res.status(e.status).send(e);
        }
    });

    router.post("/transfer", (req: Request, res: Response) => {
        // Check if user is authorized
        // Get principal
        if(!res.locals.authorization) throw new BadRequest("Missing fields");
        let principal: Principal = JSON.parse(res.locals.authorization.data);
        if(!principal.id || principal.id == 0) throw new BadRequest("Missing fields");
        // Check if the account that will have money transfered from belongs to this user
    });

    router.post("/withdraw", (req: Request, res: Response) => {
        // Check if user is authorized
        // Get principal
        if(!res.locals.authorization) throw new BadRequest("Missing fields");
        let principal: Principal = JSON.parse(res.locals.authorization.data);
        if(!principal.id || principal.id == 0) throw new BadRequest("Missing fields");
    });

    return router;
}