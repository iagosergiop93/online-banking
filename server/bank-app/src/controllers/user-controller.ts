import express, { Router } from "express";
import { Request, Response } from "express";
import { UserService } from "../services/user-service";
import { User } from "../entities/User";
import { createJwt } from "../utils/jwt-util";

var router: Router = express.Router();
var userService = new UserService();

function loginJwt() {

}

async function loginCredentials(req: Request, res: Response) {
	// Extract email and password from body
	let email = req.body.email;
	let passwd = req.body.passwd;
	try {
		let resp = await userService.loginService(email, passwd);
		if(resp) {
			let token = createJwt(resp);
			if(token) res.set('Authorization', token);
			res.send(resp);
		}
		
	} catch(err) {
		if(!err) {
			res.status(400);
			res.send({
				errorMsg: "Credentials are invalid",
				status: 400
			})
		}
		else {
			res.status(500);
			res.send({
				errorMsg: err,
				status: 400
			})
		}
	}
}

router.post("/auth", async (req: Request, res: Response) => {
	// Extract email and password from body
	let email = req.body.email;
	let passwd = req.body.passwd;
	try {
		let resp = await userService.loginService(email, passwd);
		if(resp) {
			let token = createJwt(resp);
			if(token) res.set('Authorization', token);
			res.send(resp);
		}
		
	} catch(err) {
		if(!err) {
			res.status(400);
			res.send({
				errorMsg: "Credentials are invalid",
				status: 400
			})
		}
		else {
			res.status(500);
			res.send({
				errorMsg: err,
				status: 400
			})
		}
	}
});

router.post("/register", async (req: Request, res: Response) => {
	// Extract user from body
	let user = new User(req.body.firstName, req.body.lastName, req.body.email, req.body.passwd);
	try {
		let resp = await userService.registerService(user);
		res.send(resp);
	} catch(err) {
		res.status(400);
		res.send({
			errorMsg: err,
			status: 400
		});
	}
});

module.exports = router;