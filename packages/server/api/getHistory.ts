import { intraday, Order, SpotPrice, Trade } from "tsetmc-api";

type History = {
  trades: Trade[];
  spot_prices: SpotPrice[];
  order_book: Order[];
};

export const getHistory = async () => {
  let result: History | null = null;
  try {
    result = await intraday("32338211917133256", "2020-03-16");
  } catch (e) {
    console.log("error in getting history", e);
  }
  return result;
};
