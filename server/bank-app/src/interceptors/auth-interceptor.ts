import { Request, Response, NextFunction } from "express";
import { createJwt, verifyJwt } from "../utils/jwt-util";

export function authFilter(req: Request, res: Response, next: NextFunction) {
	console.log("In auth filter");
	
	let token = req.headers.authorization;
	if(token) {
		let principalStr = verifyJwt(token);
		if(principalStr) req.params.principal = principalStr;
	}
	next();
}