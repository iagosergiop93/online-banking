import { Request } from "express";
import { BadRequest } from "../exceptions/bad-request";

export function validateEmail(email: string) {
    let expr = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return expr.test(email);
}

export function validateSize(passwd: string, min?: number, max?: number) {
    if(min && passwd.length < min) return false;
    if(max && passwd.length > min) return false;

    return true;
}

export function validateUserRegistration(req: Request) {
    if(!req.body.email && !req.body.passwd && !req.body.firstName && !req.body.lastName) throw new BadRequest("Missing field");
    if(!validateEmail(req.body.email)) throw new BadRequest("Invalid email");
    if(!validateSize(req.body.passwd, 4)) throw new BadRequest("This password is too short");
    if(!validateSize(req.body.firstName, 2)) throw new BadRequest("Invalid first name");
}

export function validateCredentials(req: Request) {
    if(!validateEmail(req.body.email)) throw new BadRequest("Invalid credentials");
    if(!validateSize(req.body.passwd, 4)) throw new BadRequest("Invalid credentials");
}