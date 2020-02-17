import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import { createConnection } from "typeorm";

// import Filters
import { authFilter } from "./interceptors/auth-interceptor";

// import Controllers
var userController = require("./controllers/user-controller");
var accController = require("./controllers/account-controller");

const PORT = 4201;
const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

// Create DB Connection
createConnection().then(() => {
	// Create DB tables
	console.log("Checked tables successfully.")
}).catch(err => console.log(err));


// Interceptor
app.use(authFilter);

// Routing
app.use("/users", userController);
app.use("/accounts", accController);


app.listen(PORT, () => {
	console.log("App listening on port " + PORT);
});
