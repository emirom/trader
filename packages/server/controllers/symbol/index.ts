import { Express } from "express";
import { deleteSymbols } from "./deleteSymbols";
import { getSymbol } from "./getSymbol";
import { getSymbols } from "./getSymbols";
// import { watchCustomerType, watchSymbol } from "../api/watchSymbol";
import { initializeSymbolsApi } from "./initializeSymbols";

export const symbolRoutes = (app: Express) => {
  app.get("/symbol/initialize", initializeSymbolsApi);
  app.get("/symbol/get", getSymbol);
  app.get("/symbol/getAll", getSymbols);
  app.delete("/symbol/deleteAll", deleteSymbols);
  // app.get("/watch/:inscode", watchSymbol);
  // app.get("/watch/ct/:inscode", watchCustomerType);
};
