import express, { Router, Request, Response, NextFunction } from "express";
import { AccountService } from "../services/account-service";


var router: Router = express.Router();
var accService = new AccountService();

router.get("/id/:id", async (req: Request ,res: Response) => {

});

router.get("/type/:type", async (req: Request, res: Response) => {

});

router.post("/type/:type", async (req: Request, res: Response) => {
	
});

router.get("/", async (req: Request, res: Response) => {
	if(!req.params.principal) {
		res.status(403).send("User is not authenticated.");
	}
	else {
		res.send();
	}
});

module.exports = router;