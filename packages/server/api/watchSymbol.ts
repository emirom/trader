import got, { Response } from "got/dist/source";
import { newAliveAgent } from "../utils/got";
import { mergeObjects } from "../utils/mergeObjects";
import { IClientTypeVolCnt } from "./getClientTypesToday";

export const watchSymbol = async (inscode: string) => {
  const url = `http://www.tsetmc.com/tsev2/data/instinfodata.aspx?i=${inscode}&c=27`;
  const response = await got.get(url, newAliveAgent());
  const raw = response.body;
  const parts = raw.split(";");
  const prices = extractPrices(parts[0]);
  console.log(parts[1], "\n\n", parts[3]);

  const limits = extractLimits(parts[2]);
  const clientType = extractClientType(parts[4]);

  // console.table(limits);
  // console.table(prices);
  // console.table(clientType);

  return {
    ...limits,
    ...prices,
    ...clientType,
  };
};

type WatchClientType = (string) => Promise<IClientTypeVolCnt>;

export const watchClientType: WatchClientType = async (inscode: string) => {
  const url = `http://www.tsetmc.com/tsev2/data/instinfodata.aspx?i=${inscode}&c=27`;
  const response: Response<string> = await got.get(url, newAliveAgent());
  const raw: string = response.body;
  const parts: string[] = raw.split(";");
  return {
    inscode,
    ...extractClientType(parts[4]),
  };
};

const extractLimits = (rawLimits) => {
  const withEmpty = rawLimits.split(",");
  const notEmptyRows = [withEmpty[0], withEmpty[1], withEmpty[2]];

  const resultArray = notEmptyRows.map((row, index) => {
    const columns = row.split("@");
    // z : zahlen (integer number), p :price, q : quantity, d: dealer, o: owner
    return {
      ["zd" + (+index + 1)]: +columns[0],
      ["qd" + (+index + 1)]: +columns[1],
      ["pd" + (+index + 1)]: +columns[2],
      ["po" + (+index + 1)]: +columns[3],
      ["qo" + (+index + 1)]: +columns[4],
      ["zo" + (+index + 1)]: +columns[5],
    };
  });
  return mergeObjects(resultArray);
};
const extractClientType = (rawCt) => {
  const columns = rawCt.split(",");
  return {
    Buy_I_Volume: +columns[0],
    Buy_N_Volume: +columns[1],
    Sell_I_Volume: +columns[3],
    Sell_N_Volume: +columns[4],
    Buy_CountI: +columns[5],
    Buy_CountN: +columns[6],
    Sell_CountI: +columns[8],
    Sell_CountN: +columns[9],
  };
};

const extractPrices = (rawPrices) => {
  const columns = rawPrices.split(",");
  return {
    pl: +columns[3], // آخرین معامله
    pc: +columns[4], // قیمت پایانی
    pf: +columns[5], // اولین قیمت
  };
};
