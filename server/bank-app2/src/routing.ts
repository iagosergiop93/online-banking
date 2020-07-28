import { Express } from "express";

// import Filters
import { authFilter } from "./interceptors/auth-interceptor";

// import Error Handler
import { errorHandler } from "./exceptions/error-handler";

// import Controllers
import { userController } from "./controllers/user-controller";
import { accountController } from "./controllers/account-controller";
import { transactionController } from "./controllers/transaction-controller";
import { testController } from "./controllers/test-controller";

export function AppRouter(app: Express) {

    // Interceptor
    app.use(authFilter);

    // Routing
    app.use("/users", userController());
    app.use("/accounts", accountController());
    app.use("/transactions", transactionController());
    app.use("/test", testController());

}