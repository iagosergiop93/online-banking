import jwt from "jsonwebtoken";
import { Principal } from "../entities/Principal";
import * as config from "../../resources/jwtconfig.json";
import { BadRequest } from "../exceptions/bad-request";
import { ServerError } from "../exceptions/server-error";

const CONFIG = config;

export function createJwt(principal: Principal) : string {
	let payload = {
		data: JSON.stringify(principal),
		exp: Math.floor(Date.now() / 1000) + config.expiration_seconds
	}
	console.log("payload", payload);
	let token;
	try {
		token = jwt.sign(payload, CONFIG.secret);
	} catch(err) {
		throw new ServerError("Cannot create Token");
	}
	return config.scheme + " " + token;
}

export function verifyJwt(code: string) : string {
	let [scheme, token] = code.split(" ");
	try {
		if(scheme != config.scheme) throw new BadRequest("Invalid authorization token");
		let payload = jwt.verify(token, CONFIG.secret) as string;
		if(!payload) throw new BadRequest("Invalid authorization token");
		return payload;
	} catch(err) {
		if(err instanceof BadRequest) throw err;
		else throw new ServerError("Error while verifying token");
	}
}