import { Express } from "express";
import { cciOnAll } from "./cciIndicator";

export const indicatorRoutes = (app: Express) => {
  app.get("/indicator/cci/onAll", cciOnAll);
};
