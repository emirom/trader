import { ISymbol } from "../models/Symbol";

export const kharidGoruhi = (symbol: ISymbol) =>
  symbol.bvol < symbol.tvol / 2 && symbol.pcp <= -3.7;
