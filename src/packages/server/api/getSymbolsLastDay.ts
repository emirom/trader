// import { LocalStorage } from "node-localstorage";
import got from "got/dist/source";
import { mergeObjects } from "../utils/mergeObjects";

export const getSymbolsLastDay = async () => {
  const url = "http://www.tsetmc.com/tsev2/data/MarketWatchPlus.aspx";
  const response = await got.get(url);
  const content = JSON.stringify(response.body);
  const parts = content.split("@");
  // console.log("content", parts);
  const symbols = parseSymbolData(parts[2]);
  const bestLimits = parseBestLimits(parts[3]);

  const merge = mergeLimitsAndSymbols(symbols, bestLimits);
  console.log("mergeLimitsAndSymbols", merge);
};

const parseSymbolData = (symbols_raw) => {
  const symbol_data = symbols_raw.split(";");

  const symbols = symbol_data.map((row) => {
    const columns = row.split(",");
    return {
      iid: columns[0],
      code: columns[1],
      symbol: columns[2],
      name: columns[3],
      heven: columns[4],
      first_price: columns[5],
      close_price: columns[6],
      last_price: columns[7],
      count: columns[8],
      volume: columns[9],
      value: columns[10],
      min_traded_price: columns[11],
      max_traded_price: columns[12],
      yesterday_price: columns[13],
      eps: columns[14],
      base_volume: columns[15],
      c2: columns[16],
      table_id: columns[17],
      group_id: columns[18],
      max_allowed_price: columns[19],
      min_allowed_price: columns[20],
      type_of_symbol: columns[22],
      all_count_of_symbol: columns[21],
    };
  });
  return symbols;
};

export const parseBestLimits = (limits_raw) => {
  const limits_data = limits_raw.split(";");
  const limits = limits_data.map((row) => {
    const columns = row.split(",");
    // console.log("columns[0]", columns[0]);
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
      (limit: { iid: any }) => limit.iid === symbol.iid
    );
    const relatedLimits = mergeObjects(limitsArray);
    // console.log("relatedSymbol", relatedLimits);
    return {
      ...symbol,
      ...relatedLimits,
    };
  });
};
