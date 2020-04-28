import { Router, Request, Response } from "express";
import { BadRequest } from "../exceptions/bad-request";
import { Principal } from "../entities/Principal";
import { Transaction } from "../entities/Transaction";
import { TransactionService } from "../services/transaction-service";

export function transactionController(transactionService: TransactionService) {
    let router = Router();

    router.post("/deposit", (req: Request, res: Response) => {
        // Check if user is authorized
        // Get principal
        if(!res.locals.authorization) throw new BadRequest("Missing fields");
        let principal: Principal = JSON.parse(res.locals.authorization.data);
        if(!principal.id || principal.id == 0) throw new BadRequest("Missing fields");
        let transaction: Transaction = req.body;
        // Check if the transaction matches the endpoint
        
        // Check if account belongs to user who is making the deposit
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