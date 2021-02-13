import { ISymbol } from "../models/Symbol";

export const tenPercent = (symbol: ISymbol) =>
  symbol.tmax - symbol.tmin === 0.2 * symbol.tmin;
