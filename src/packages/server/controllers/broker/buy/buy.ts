import { Request, Response } from "express";
import {
  getClientTypesToday,
  IClientTypeVolCnt,
} from "../../../api/getClientTypesToday";
import Symbol, { ISymbol } from "../../../models/Symbol";
import { buySymbol, hasMinimalProfit } from "./buyUtils";
import { calcIndicators } from "./calcIndicators";

/**
 *
 */
export const makeBuyList = async (req: Request, res: Response) => {
  try {
    console.log("path is correct!");
    const isBuying: boolean = !!req.query.isBuying;

    const symbols: ISymbol[] = await Symbol.find({}).lean();
    const clientTypes: IClientTypeVolCnt[] = await getClientTypesToday();
    console.log(symbols.length);

    // const filteredSymbols = filterSymbols(symbols);
    const filteredSymbols = symbols;
    console.log("filtered symbols: ", filteredSymbols.length);

    const buyList = await calcIndicators(
      filteredSymbols,
      clientTypes,
      isBuying
    );
    buyList.sort((a, b) => b.sum - a.sum);
    console.table(buyList);

    if (hasMinimalProfit(buyList[0].symbol, 1.5)) {
      await buySymbol(buyList[0], 10000000);
    }
    // withStoc
    res.status(200).send("bought");
  } catch (error) {
    res.status(500).send(error);
  }
};
