import { ISymbol } from "../models/Symbol";

/**
 * سهم‌هایی که امروز حداقل 5 برابر میانگین حجم ماهیانه معامله شده‌اند (حجم‌های مشکوک)
 * @param symbols
 */
export const hajmMashkuk = (symbols: ISymbol[]) => {
  return symbols.filter((symbol) => symbol.tvol > 5 * symbol.avg30_QTotTran5J);
};
