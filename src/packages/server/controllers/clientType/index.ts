import { Express } from "express";
import { getClientTypesToday } from "../../api/getClientTypesToday";

export const clientTypeRoutes = (app: Express) => {
  app.get("/ct/getAll", getClientTypesToday);
};
