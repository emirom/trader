// const applyFormula = (symbols:ISymbol,ih:Ih, formula: ()=>Symbol[])=>{
//     const mashkukList =
// }
import { Express } from "express";
import { khoroujPul1 } from "./khoroujPul1";
import { voroudPul1 } from "./voroudPul1";
import { voroudPul2 } from "./voroudPul2";

export const filterRoutes = async (app: Express) => {
  app.get("/filter/voroudPul1", voroudPul1);
  app.get("/filter/voroudPul2", voroudPul2);
  app.get("/filter/khoroujPul1", khoroujPul1);
};
