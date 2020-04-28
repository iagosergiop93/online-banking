import { Router, Request, Response } from "express";
import { AccountService } from "../services/account-service";

export function accountController(accountService: AccountService) {
    let router = Router();

    router.post("/", (req: Request, res: Response) => {
        
    });

    router.get("/user/{id}", (req: Request, res: Response) => {
        
    });

    router.get("/accNumber/{accNumber}", (req: Request, res: Response) => {
        
    });

    return router;
}