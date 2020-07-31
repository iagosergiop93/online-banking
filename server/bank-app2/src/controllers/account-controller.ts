import { Router, Request, Response } from "express";
import { AccountService } from "../services/account-service";
import { BadRequest } from "../exceptions/bad-request";
import { Principal } from "../entities/Principal";
import { checkForToken } from "../utils/validator";

export function accountController() {

    let accountService: AccountService = AccountService.prototype.Factory();
    let router = Router();

    router.use(checkForToken);

    router.post("/type/:type/user/:id", async (req: Request, res: Response) => {
        req.log.info('In accountController /accounts/type/:type/user/:id');
        try {
            const principal: Principal = JSON.parse(res.locals.authorization.data);
            const id = parseInt(req.params["id"]);
            const type = parseInt(req.params["type"]);
            if(principal.id !== id) throw new BadRequest("Unauthorized user");
            let account = await accountService.createAccount(type, id);
            res.status(201).send(account);
        } catch (e) {
            req.log.error(e);
            res.status(e.status).send(e);
        }
    });

    router.get("/user/:id", async (req: Request, res: Response) => {
        req.log.info('In accountController /accounts/user/:id');
        try {
            const principal: Principal = JSON.parse(res.locals.authorization.data);
            const id = parseInt(req.params["id"]);
            if(principal.id !== id) throw new BadRequest("Unauthorized user");
            let accounts = await accountService.getAccountsByUserId(principal.id);
            res.status(200).send(accounts);
        } catch(e) {
            req.log.error(e);
            res.status(e.status).send(e);
        }
    });

    router.get("/accNumber/{accNumber}", (req: Request, res: Response) => {
        
    });

    return router;
}