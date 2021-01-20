import { ISymbol } from "../models/Symbol";
import { baseFilter } from "./baseFilter";

/**
 * سهم‌هایی که امروز حداقل 5 برابر میانگین حجم ماهیانه معامله شده‌اند (حجم‌های مشکوک)
 * @param symbols
 */
export const hajmMashkuk = (symbols) => {
  baseFilter(symbols, hajmMashkukFilter);
};

const hajmMashkukFilter: (symbol: ISymbol) => boolean = (symbol) =>
  symbol.tvol > 5 * symbol.avg30_QTotTran5J;
