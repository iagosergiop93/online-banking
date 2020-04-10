import { Router, Request, Response } from "express";
import { AccountService } from "../services/account-service";

export function accountController(accountService: AccountService) {
    let router = Router();

    router.get("/type/:type", (req: Request, res: Response) => {
        
    });

    return router;
}