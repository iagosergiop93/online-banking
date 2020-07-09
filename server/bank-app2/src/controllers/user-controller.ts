import { Router, Request, Response } from "express";
import { UserService } from "../services/user-service";
import { validateUserRegistration, validateCredentials } from "../utils/validator";
import { User } from "../entities/User";
import { BadRequest } from "../exceptions/bad-request";
import { Role } from "../entities/Role";
import { Principal } from "../entities/Principal";
import { createJwt } from "../utils/jwt-util";
import { ServerError } from "../exceptions/server-error";

export function userController(): Router {
    
    let userService: UserService = UserService.prototype.Factory();
    let router = Router();

    router.post("/register", async (req: Request, res: Response) => {
        console.log("In /register handler")
        console.log(userService);
        try {
            // validate input (throws BadRequest if something is wrong)
            validateUserRegistration(req);
            
            // if all valid, register user and create checking account
            let newUser = new User(0, req.body.firstName, req.body.lastName, req.body.email, req.body.passwd, Role.USER);
            newUser = await userService.registerUser(newUser);

            // create token for newUser
            let principal = new Principal(newUser.id, newUser.firstName, newUser.lastName, newUser.email, newUser.role);
            let token = createJwt(principal);
            if(!token) throw new ServerError("User was created but token was not.");

            res.setHeader("authorization", token);
            res.status(201).send(principal);

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
            validateCredentials(req);

            // check if the user exists in the database
            let user = await userService.login(req.body.email, req.body.passwd);

            // create token for user
            let principal = new Principal(user.id, user.firstName, user.lastName, user.email, user.role);
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