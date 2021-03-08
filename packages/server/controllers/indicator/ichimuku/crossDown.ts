import { RangeHistory } from "../../../models/DayHistory";
import { ISymbol } from "../../../models/Symbol";

// ۲- فیلتر کراس خط تنکانسن و کیجونسن رو به پایین (سیگنال منفی):
export const IchimokuCrossDown = (ih: RangeHistory[], symbol: ISymbol) => {
  try {
    var ten = (ih[9].PriceMin + ih[9].PriceMax) / 2;

    var kiju = (ih[26].PriceMin + ih[26].PriceMax) / 2;

    return (
      kiju > 0.99 * ten &&
      kiju < 1.05 * ten &&
      symbol.pl < ten &&
      symbol.pl < kiju &&
      symbol.pf < kiju &&
      symbol.pl < ih[9].PriceMax &&
      symbol.plp < 0
    );
  } catch (error) {
    console.log(error);
    throw new Error("Ichimoku cross down:" + error);
  }
};
