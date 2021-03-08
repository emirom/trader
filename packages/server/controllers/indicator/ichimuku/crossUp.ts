import { RangeHistory } from "../../../models/DayHistory";
import { ISymbol } from "../../../models/Symbol";

// ۱- فیلتر کراس خط تنکاسن و کیجوسن رو به بالا (سیگنال مثبت):
export const IchimokuCrossUp = (
  ih: RangeHistory[],
  symbol: ISymbol
): boolean => {
  try {
    var ten = (ih[9].PriceMin + ih[9].PriceMax) / 2;

    var kiju = (ih[26].PriceMin + ih[26].PriceMax) / 2;

    return (
      ten > 0.999 * kiju &&
      ten < 1.1 * kiju &&
      symbol.pl > ten &&
      symbol.pl > ih[26].PriceMax &&
      symbol.plp > 0
    );
  } catch (error) {
    throw new Error("ichimokuCrossUp : " + error);
  }
};
