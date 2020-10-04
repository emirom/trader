import { getStocksList } from "./queries/getStocksList";

(async function () {
  const stockList = await getStocksList();
  if (stockList) {
    console.log("da", stockList[0]);
  }
})();
