import { updateIntraHistory } from "./controllers/instHistory/updateIh";
import { getSymbols } from "./controllers/symbol/getSymbols";
import { startServer } from "./server";

(async function () {
  // const id = 35425587644337450;
  try {
    await startServer();
    // await updateSymbols();
    const symbols = await getSymbols();

    await updateIntraHistory(symbols);
  } catch (error) {
    console.log("______index__error______", error);
  }
})();
