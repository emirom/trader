import { Express } from "express";
import { makeBuyList } from "./buy/buy";
import { login } from "./login/puppeteer/loginPuppeteer";

export const brokerRoutes = (app: Express) => {
  app.get("/broker/login", login);
  app.get("/broker/buy/list", makeBuyList);
};
