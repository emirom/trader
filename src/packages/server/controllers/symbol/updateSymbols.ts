import { getSymbolsLastDay } from "../../api/getSymbolsLastDay";
import ISymbol from "../../models/ISymbol";
const onInsert = (err, docs) => {
  err
    ? console.error("***** errer on insert", err)
    : console.info(docs.length + "symbols sucessfully updated ...");
};

export const updateSymbols = async () => {
  const data = await getSymbolsLastDay();
  ISymbol.collection.insertMany(data, onInsert);
};
