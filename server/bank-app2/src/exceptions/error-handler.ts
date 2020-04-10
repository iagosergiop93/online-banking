import { Request, Response, NextFunction } from "express";
import { BaseError } from "./base-error";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.log("In error handler")
    if(err) {
        res.status(err.status).send(err);
    }
}