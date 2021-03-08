import HttpAgent, { HttpsAgent } from "agentkeepalive";
import cheerio from "cheerio";
import got from "got/dist/source";

export type SymbolOrder = {
  id: string;
  time: number;
  volume: string;
  price: number;
};

const gotOption = {
  keepAlive: true,
  maxSockets: 10,
};

export const getTodayOrders = async (id: string): Promise<SymbolOrder[]> => {
  try {
    const url = `http://www.tsetmc.com/tsev2/data/TradeDetail.aspx?i=${id}`;
    const body = (
      await got.get(url, {
        agent: {
          http: new HttpAgent(gotOption),
          https: new HttpsAgent(gotOption),
        },
      })
    ).body;

    return extract(body);
  } catch (err) {
    throw new Error("symbol error : " + err);
  }
};

// rm export
export const extract = (raw: string) => {
  const rowsString = cheerio("row", "rows", raw).text();
  const rowsCorrected = "\n" + rowsString;
  const rowsArray = rowsCorrected.split("\n\n");
  const cellsArray = rowsArray.map((row) => {
    const rows = row.split("\n");
    return {
      id: rows[0],
      time: +rows[1],
      volume: rows[2],
      price: +rows[3],
    };
  });

  console.log("cells", cellsArray);
  return cellsArray;
};
