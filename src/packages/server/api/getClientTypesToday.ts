import got from "got/dist/source";
const CLIENT_TYPE_URL = "http://www.tsetmc.com/tsev2/data/ClientTypeAll.aspx";

export const getClientTypesToday: () => Promise<IClientType[]> = async () => {
  try {
    console.log("\nstarted getting today client types... ");
    const raw = (await got.get(CLIENT_TYPE_URL)).body;
    if (!raw) {
      throw new Error("Error in reading client type 'Empty Body'");
    }

    const res = raw.split(";").map((row) => extract(row));
    console.log("All client types received ...");

    return res;
  } catch (error) {
    return error;
  }
};

const extract: (row: string) => IClientType = (row) => {
  const columns = row.split(",");
  const ct = {
    inscode: columns[0],
    Buy_CountI: +columns[1],
    Buy_CountN: +columns[2],
    Buy_I_Volume: +columns[3],
    Buy_N_Volume: +columns[4],
    Sell_CountI: +columns[5],
    Sell_CountN: +columns[6],
    Sell_I_Volume: +columns[7],
    Sell_N_Volume: +columns[8],
  } as IClientType;
  // console.log(ct);

  return ct;
};

export interface IClientType {
  inscode: string;
  Buy_CountI: number;
  Buy_CountN: number;
  Buy_I_Volume: number;
  Buy_N_Volume: number;
  Sell_CountI: number;
  Sell_CountN: number;
  Sell_I_Volume: number;
  Sell_N_Volume: number;
}
