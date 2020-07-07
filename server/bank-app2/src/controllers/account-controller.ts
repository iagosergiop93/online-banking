import { Router, Request, Response } from "express";
import { AccountService } from "../services/account-service";
import { BadRequest } from "../exceptions/bad-request";
import { Principal } from "../entities/Principal";
import { checkForToken } from "../utils/validator";

export function accountController(accountService: AccountService) {
    let router = Router();

    router.use(checkForToken);

    router.post("/", (req: Request, res: Response) => {
        
    });

    router.get("/user/:id", async (req: Request, res: Response) => {
        console.log("In /account/user/id")
        try {
            let principal: Principal = JSON.parse(res.locals.authorization.data);
            let id = parseInt(req.params["id"]);
            if(principal.id !== id) throw new BadRequest("Unauthorized user");
            let accounts = await accountService.getAccountsByUserId(principal.id);
            res.status(200).send(accounts);
        } catch(e) {
            res.status(e.status).send(e);
        }
    });

    router.get("/accNumber/{accNumber}", (req: Request, res: Response) => {
        
    });

    return router;
}