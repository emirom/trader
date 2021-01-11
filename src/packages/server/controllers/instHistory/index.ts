import { updateIntraHistory } from "./updateIh";

export const intraHistory = (app) => {
  app.post("/api/ih/update", updateIntraHistory);
};
