import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import corsConfig from "../resources/cors-config.json";
import { AppRouter } from "./routing";
//import { initializeContainer } from "./container/container-init";

const PORT = 4201;
const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(cors(corsConfig));

// Initialize Container
//let container = initializeContainer();

AppRouter(app);

app.listen(PORT, () => {
	console.log("App listening on port " + PORT);
});