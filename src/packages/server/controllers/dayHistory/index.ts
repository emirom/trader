import { Express } from "express";
import { getDayHistory } from "./getDayHistory";
import { initializeDayHistory } from "./initializeDayHistory";

export const dayHistoryRoutes = (app: Express) => {
  app.get("/history/initialize", initializeDayHistory);
  app.get("/history/:inscode", getDayHistory);
};
