import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

// import factory
import { Container } from "./utils/container";

// import Filters
import { authFilter } from "./interceptors/auth-interceptor";

// import Error Handler
import { errorHandler } from "./exceptions/error-handler";

// import Controllers
import { userController } from "./controllers/user-controller";
import { accountController } from "./controllers/account-controller";

// import Services, Daos and Utils
import { UserService } from "./services/user-service";
import { AccountService } from "./services/account-service";
import { UserDao } from "./daos/user-dao";
import { AccountDao } from "./daos/account-dao";

const PORT = 4201;
const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

// Factory
const container = new Container();
container.registerDependencies([
	UserDao,
	AccountDao,
	UserService,
	AccountService
]);

// Interceptor
app.use(authFilter);

// Routing
app.use("/users", userController.apply(null, container.getFunDependencies(userController)));
app.use("/accounts", accountController.apply(null, container.getFunDependencies(accountController)));


app.listen(PORT, () => {
	console.log("App listening on port " + PORT);
});