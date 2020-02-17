import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { Principal } from "../entities/Principal";
import * as config from "../../jwtconfig.json";

const CONFIG = config;

export function createJwt(principal: Principal) : string {
	// let principal = new Principal(user.id, user.firstName, user.email, user.role);
	let payload = {
		data: JSON.stringify(principal),
		exp: Math.floor(Date.now() / 1000) + config.expiration_seconds
	}
	let token;
	try {
		token = jwt.sign(payload, CONFIG.secret);
	} catch(err) {
		console.log("JWT creation failed.");
	}
	return token;
}

export function verifyJwt(token: string) : string {
	try {
		let payload = jwt.verify(token, CONFIG.secret) as string;
		return payload;
	} catch(err) {
		console.log("Error while verifying token");
	}
}