import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import corsConfig from "./resources/cors-config.json";
import pinoHttp from "pino-http";
import cron from "node-cron";

import { AppRouter } from "./routing";
import { getPinoLogger } from "./utils/logger";
import { savingsAccountUpdate } from "./batch-jobs/savings-account-job";

const logger = pinoHttp(getPinoLogger());

const PORT = 4201;
const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(cors(corsConfig));
app.use(logger)

AppRouter(app);

app.listen(PORT, () => {
	console.log("App listening on port " + PORT);
});

// Jobs
cron.schedule('0 23 18 7 * *', () => {
	console.log("Running Savings job at ", new Date().toString());
	savingsAccountUpdate();
});