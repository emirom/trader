import { Asset, assets } from "tsetmc-api";

export const getStocksList = async () => {
  let result: Asset[] | null = null;
  try {
    const res = await assets();
    if (res) {
      result = res;
    }
  } catch (e) {
    console.log("error in getting stocks list", e);
  }
  return result;
};
