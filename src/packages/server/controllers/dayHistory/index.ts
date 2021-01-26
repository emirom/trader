import { Express } from "express";
import { initializeDayHistory } from "./initializeDayHistory";

export const intraHistory = (app: Express) => {
  app.post("/ih/initializeAll", initializeDayHistory);
};
