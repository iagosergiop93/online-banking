import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt-util";
import { BadRequest } from "../exceptions/bad-request";

export function authFilter(req: Request, res: Response, next: NextFunction) {
	console.log("In auth filter");
	try {
		let token = req.headers.authorization;
		console.log("Token: " + token);
		if(!!token) {
			let principalStr = verifyJwt(token);
			console.log(principalStr);
			if(principalStr) res.locals.authorization = principalStr;
		}
		next();
	} catch(e) {
		let err = new BadRequest("Invalid token");
		res.status(err.status).send(err);
	}
}