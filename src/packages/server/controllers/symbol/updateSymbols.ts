import { getSymbolsLastDay } from "../../api/getSymbolsLastDay";
import Ih from "../../models/dayHistory";
import Symbol from "../../models/Symbol";
// import Symbol from "../../models/Symbol";

const onCreate = (err, docs) => {
  err
    ? console.error("***** errer on insert", err)
    : console.info(docs.length + "symbols were updated sucessfully ...");
};

export const updateSymbols = async () => {
  const data = await getSymbolsLastDay();
  const history = await Ih.find();
  await Symbol.create(data, onCreate);
};

// میانگین حجم ماهیانه
const avg30_QTotTran5J = (ih) =>
  ih.reduce((sum, currentIh) => sum + currentIh.QTotTran5J, 0) / 30;
