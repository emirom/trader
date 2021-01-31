// import { LocalStorage } from "node-localstorage";
import got from "got/dist/source";
import { mergeObjects } from "../utils/mergeObjects";

export const getSymbolsLastDay = async () => {
  const url = "http://www.tsetmc.com/tsev2/data/MarketWatchPlus.aspx";
  const response = await got.get(url);
  const content = response.body;
  const parts = content.split("@");

  const symbols = parseSymbolData(parts[2]);
  const bestLimits = parseBestLimits(parts[3]);

  const symbolsAndLimits = mergeLimitsAndSymbols(symbols, bestLimits);
  return symbolsAndLimits;
};

const parseSymbolData = (symbols_raw) => {
  const symbol_data = symbols_raw.split(";");

  const symbols = symbol_data.map((row) => {
    const columns = row.split(",");
    return {
      inscode: columns[0],
      iid: columns[1],
      l18: columns[2],
      l30: columns[3],
      heven: columns[4],
      pf: columns[5],
      pc: +columns[6],
      pl: columns[7],
      tno: columns[8],
      tvol: columns[9],
      tval: columns[10],
      pmin: columns[11],
      pmax: columns[12],
      py: columns[13],
      eps: columns[14],
      bvol: columns[15],
      visitcount: columns[16],
      flow: columns[17],
      cs: columns[18],
      tmax: columns[19],
      tmin: columns[20],
      z: columns[22],
      yval: columns[21],
    };
  });
  return symbols;
};

export const parseBestLimits = (limits_raw) => {
  const limits_data = limits_raw.split(";");
  const limits = limits_data.map((row) => {
    const columns = row.split(",");

    const number = columns[1];
    return {
      // z : zahlen (integer number), p :price, q : quantity, d: dealer, o: owner
      iid: columns[0],
      ["zo" + number]: columns[2],
      ["zd" + number]: columns[3],
      ["pd" + number]: columns[4],
      ["po" + number]: columns[5],
      ["qd" + number]: columns[6],
      ["qo" + number]: columns[7],
    };
  });
  return limits;
};

const mergeLimitsAndSymbols = (symbols, bestLimits) => {
  return symbols.map((symbol) => {
    const limitsArray = bestLimits.filter(
      (limit: { iid: number }) => limit.iid === symbol.iid
    );
    const relatedLimits = mergeObjects(limitsArray);
    // console.log("relatedSymbol", relatedLimits);
    return {
      ...symbol,
      ...relatedLimits,
    };
  });
};
