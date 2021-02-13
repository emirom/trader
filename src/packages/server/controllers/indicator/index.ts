import { Express } from "express";
import { makeBuyList } from "../../filters/buy/buy";
import { cciOnAll } from "./cci";
import { macdOnAll } from "./macd/macd";
import { stocOnAll } from "./stoc";

export const indicatorRoutes = (app: Express) => {
  app.get("/indicator/cci/onAll", cciOnAll);
  app.get("/indicator/stoc/onAll", stocOnAll);
  app.get("/indicator/macd/onAll", macdOnAll);
  app.get("/indicator/buy/list", makeBuyList);
};
