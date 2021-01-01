import { getSymbolsLastDay } from "../../api/getSymbolsLastDay";
import Symbol from "../../models/Symbol";
// import Symbol from "../../models/Symbol";

const onCreate = (err, docs) => {
  err
    ? console.error("***** errer on insert", err)
    : console.info(docs.length + "symbols were updated sucessfully ...");
};

export const updateSymbols = async () => {
  const data = await getSymbolsLastDay();
  await Symbol.create(data, onCreate);
};
