import { Request, Response } from "express";
import { IClientTypeVolCnt } from "../api/getClientTypesToday";
import { ISymbol } from "../models/Symbol";
import { baseFilter } from "./baseFilter";

export const khoroujPul1 = async (_req: Request, res: Response) => {
  try {
    const filtered: ISymbol[] = await baseFilter(khoroujPul1Filter);
    const list = filtered.map((symbol) => symbol.l18);
    res.status(200).send(list);
  } catch (error) {
    res.status(500).send(error);
  }
};

const khoroujPul1Filter = (symbol: ISymbol, ct?: IClientTypeVolCnt) =>
  ct
    ? symbol.tvol > symbol.avg30_QTotTran5J &&
      ct.Buy_I_Volume / ct.Buy_CountI < ct.Sell_I_Volume / ct.Sell_CountI &&
      symbol.pl <= symbol.pc &&
      symbol.plp < 0
    : false;
