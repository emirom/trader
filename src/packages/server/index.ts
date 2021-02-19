import { brokerRoutes } from "./controllers/broker";
import { clientTypeRoutes } from "./controllers/clientType";
import { dayHistoryRoutes } from "./controllers/dayHistory";
import { indicatorRoutes } from "./controllers/indicator";
import { symbolRoutes } from "./controllers/symbol";
import { filterRoutes } from "./filters";
import { startServer } from "./server";

(async function () {
  // const id = 35425587644337450;
  try {
    const { app } = await startServer();

    indicatorRoutes(app);
    filterRoutes(app);
    symbolRoutes(app);
    dayHistoryRoutes(app);
    clientTypeRoutes(app);
    brokerRoutes(app);

    // loginPuppeteer();
  } catch (error) {
    console.log("______index_error______", error);
  }
})();
