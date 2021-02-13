import { ISymbol } from "../models/Symbol";
import { baseFilter } from "./baseFilter";

/**
 * سهم‌هایی که امروز حداقل 5 برابر میانگین حجم ماهیانه معامله شده‌اند (حجم‌های مشکوک)
 * @param symbols
 */
export const hajmMashkuk = () => {
  baseFilter(hajmMashkukFilter2);
};

export const hajmMashkukFilter2: (symbol: ISymbol) => boolean = (symbol) =>
  symbol.tvol > symbol.is5 && symbol.tvol > 2 * symbol.is6;
