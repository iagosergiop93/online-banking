import { Router, Request, Response } from "express";
import { UserService } from "../services/user-service";
import { AccountService } from "../services/account-service";
import { validateEmail, validateSize } from "../utils/validator";
import { User } from "../entities/User";
import { BadRequest } from "../exceptions/bad-request";
import { Role } from "../entities/Role";
import { Principal } from "../entities/Principal";
import { createJwt } from "../utils/jwt-util";
import { ServerError } from "../exceptions/server-error";

export function userController(userService: UserService, accountService: AccountService): Router {
    
    let router = Router();

    router.post("/register", async (req: Request, res: Response) => {
        console.log("In /register handler")
        try {
            // validate input
            if(!req.body.email && !req.body.passwd && !req.body.firstName && !req.body.lastName) throw new BadRequest("Missing field");
            if(!validateEmail(req.body.email)) throw new BadRequest("Invalid email");
            if(!validateSize(req.body.passwd, 4)) throw new BadRequest("This password is too short");
            if(!validateSize(req.body.firstName, 2)) throw new BadRequest("Invalid first name");
            
            // if all valid, register user and create checking account
            let newUser = new User(0, req.body.firstName, req.body.lastName, req.body.email, req.body.passwd, Role.USER);
            newUser = await userService.registerUser(newUser);

            // create token for newUser
            let principal = new Principal(newUser.id, newUser.firstName, newUser.lastName, newUser.role);
            let token = createJwt(principal);
            if(!token) throw new ServerError("User was created but token was not.");

            res.setHeader("authorization", token);
            res.status(201).send(newUser);

        } catch(e) {
            res.status(e.status).send(e);
        }

    });

    router.post("/auth", async (req: Request, res: Response) => {
        console.log("In /auth handler");
        try {
            // Get principal
            if(!res.locals.authorization) throw new BadRequest("Missing fields");
            let principal: Principal = JSON.parse(res.locals.authorization.data);
            if(!principal.id || principal.id == 0) throw new BadRequest("Missing fields");
            let accounts = await userService.getAccountsByUserId(principal.id);
            principal.accounts = accounts;

            // create token for user
            let token = createJwt(principal);
            if(!token) throw new ServerError("Token was not created.");
            
            // send response
            res.setHeader("authorization", token);
            res.status(200).send(principal);

        } catch(e) {
            res.status(e.status).send(e);
        }
    });

    router.post("/login", async (req: Request, res: Response) => {
        console.log("In /login handler");
        try {
            // validate credentials
            if(!validateEmail(req.body.email)) throw new BadRequest("Invalid email");
            if(!validateSize(req.body.passwd, 4)) throw new BadRequest("This password is too short");

            // check if the user exists in the database
            let user = await userService.login(req.body.email, req.body.passwd);

            // create token for user
            let principal = new Principal(user.id, user.firstName, user.lastName, user.role);
            principal.accounts = user.accounts;
            let token = createJwt(principal);
            if(!token) throw new ServerError("Token was not created.");

            // send response
            res.setHeader("authorization", token);
            res.status(200).send(principal);

        } catch(e) {
            res.status(e.status).send(e);
        }
    });

    return router;
}