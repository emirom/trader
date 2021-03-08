import { Request, Response } from "express";
import DayHistory, { RangeHistory } from "../../../models/DayHistory";
import { asyncBaseMap, AsyncIndicator } from "../asyncBaseMap";
import {
  getBuyWeightMacd,
  getSellWeightMacd,
  macdFormula,
} from "./macdFormula";

export const macdOnAll = async (_req: Request, res: Response) => {
  try {
    // console.log(symbols.length + " symbols were read ...");

    const macdList = await asyncBaseMap(
      macdIndicator,
      getBuyWeightMacd,
      getSellWeightMacd,
      true
    );
    const list = macdList.map((macd) => {
      return {
        macd: macd.value,
        weight: macd.weight,
      };
    });
    list;
    console.table(list);
    res.status(200).send(macdList);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const macdIndicator: AsyncIndicator = async (symbol, getWeight) => {
  try {
    let macdValue = 0;
    let macdWeight = 0;

    if (symbol) {
      const ih: RangeHistory[] | undefined = (
        await DayHistory.findOne({ inscode: symbol.inscode })
      )?.ih;
      if (ih) {
        macdValue = macdFormula(ih);
        macdWeight = getWeight(macdValue);
      }
      // console.log({ symbol: symbol.inscode, value: macd, weight });
    }
    return { macdValue, macdWeight };
  } catch (error) {
    console.log(" Error of macd :" + error);
    return null;
  }
};
