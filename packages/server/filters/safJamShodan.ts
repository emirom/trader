import { Request, Response } from "express";
import { IClientTypeVolCnt } from "../api/getClientTypesToday";
import { ISymbol } from "../models/Symbol";
import { baseFilter } from "./baseFilter";

export const safJamShodan = (symbol: ISymbol, ct: IClientTypeVolCnt) =>
  symbol.tvol > symbol.bvol &&
  symbol.pmin == symbol.tmin &&
  ((symbol.pl - symbol.pc) / symbol.pl) * 100 > 1.5 &&
  ct.Sell_CountI >= ct.Buy_CountI &&
  symbol.tno > 5 &&
  symbol.tno > 20;

// overall without one time iterate
export const safJamShodanApi = async (_req: Request, res: Response) => {
  try {
    const filtered: ISymbol[] = await baseFilter(safJamShodan);
    const list = filtered.map((symbol) => symbol.l18);
    res.status(200).send(list);
  } catch (error) {
    res.status(500).send(error);
  }
};
