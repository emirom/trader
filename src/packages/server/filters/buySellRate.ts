import { Request, Response } from "express";
import {
  baseMap,
  Indicator,
  MappedSymbol,
  WeightFunction,
} from "../controllers/indicator/baseMap";
import { roundTo1 } from "../utils/roundTo";

/**
 * نسبت قدرت خریدار به فروشنده
 */

export const buySell = async (req: Request, res: Response) => {
  try {
    const isBuying: boolean = !!req.params.isBuying;
    const filtered: MappedSymbol[] = await baseMap(
      buySellRate,
      getBuyWeightBuySell,
      getSellWeightBuySell,
      isBuying
    );
    res.status(200).send(filtered);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const buySellRate: Indicator = (_symbol, ct, getWeight) => {
  try {
    const buyRate = buyRateFormula(ct);
    const buy = {
      kharidRate: buyRate,
      kharidWeight: getWeight(buyRate),
    };
    return buy;
  } catch (error) {
    console.log(error);
    throw new Error("buySellRate indicator rate: " + error);
  }
};

export const getBuyWeightBuySell: WeightFunction = (rate) =>
  rate > 3 ? 10 : 0;

export const getSellWeightBuySell: WeightFunction = (rate) =>
  rate < 1.1 ? 11 : 0;

export const buyRateFormula = (ct) => {
  const rate = ct
    ? ct.Buy_I_Volume / ct.Buy_CountI / (ct.Sell_I_Volume / ct.Sell_CountI)
    : 0;
  return roundTo1(rate);
};
