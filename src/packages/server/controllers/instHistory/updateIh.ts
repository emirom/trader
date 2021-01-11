import { getDailyHistory } from "../../api/getInstHistory";
import Ih from "../../models/dayHistory";

export const updateIntraHistory = async (symbols) => {
  await Ih.deleteMany();
  await Promise.all(
    symbols.map(async (symbol) => {
      const symbolHistory = await getDailyHistory(symbol.inscode);

      console.log("symbolHistory", symbolHistory);
      await Ih.create(symbolHistory);
      //TODO : pop symbolHistory from ram to prevent js callStack error
    })
  );
  console.info("updated instHistory successfully ...");
};
