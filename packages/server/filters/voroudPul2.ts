import { Request, Response } from "express";
import { IClientTypeVolCnt } from "../api/getClientTypesToday";
import { ISymbol } from "../models/Symbol";
import { baseFilter } from "./baseFilter";

export const voroudPul2 = async (_req: Request, res: Response) => {
  try {
    const filtered: ISymbol[] = await baseFilter(voroudPul2Filter);
    const list = filtered.map((symbol) => symbol.l18);
    res.status(200).send(list);
  } catch (error) {
    res.status(500).send("Error on voroudPul2 filter: " + error);
  }
};

const voroudPul2Filter = (symbol: ISymbol, ct?: IClientTypeVolCnt) =>
  ct
    ? symbol.tvol > 1.25 * symbol.is5 &&
      ct.Buy_I_Volume / ct.Buy_CountI >= ct.Sell_I_Volume / ct.Sell_CountI &&
      symbol.pl >= symbol.pc &&
      symbol.plp > 0
    : false;
