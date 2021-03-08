import { Express } from "express";
import { khoroujPul1 } from "./khoroujPul1";
import { voroudPul1Api } from "./voroudPul1";
import { voroudPul2 } from "./voroudPul2";
import { voroudPul3 } from "./voroudPul3";

export const filterRoutes = async (app: Express) => {
  app.get("/filter/voroudPul1", voroudPul1Api);
  app.get("/filter/voroudPul2", voroudPul2);
  app.get("/filter/voroudPul3", voroudPul3);
  app.get("/filter/khoroujPul1", khoroujPul1);
};
