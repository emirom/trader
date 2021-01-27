import { Express } from "express";
import { cciOnAll } from "./cci";

export const indicatorRoutes = (app: Express) => {
  app.get("/indicator/cci/onAll", cciOnAll);
};
