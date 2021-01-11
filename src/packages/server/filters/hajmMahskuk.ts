import { Ih } from "../models/dayHistory";
import { ISymbol } from "../models/Symbol";

/**
 * سهم‌هایی که امروز حداقل 5 برابر میانگین حجم ماهیانه معامله شده‌اند (حجم‌های مشکوک)
 * @param symbols
 * @param histories
 */
export const hajmMashkuk = (symbols: ISymbol[], histories: Ih[]) => {
  return symbols.filter((symbol) => {
    const ih = histories.find((h) => h.inscode === symbol.inscode);
    // return symbol.tvol > 5 * avg30_QTotTran5J(ih.history);
  });
};
