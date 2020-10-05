import axios from "axios";

export const getAll = async () => {
  const raw = await axios.get(
    "http://www.tsetmc.com/tsev2/data/MarketWatchInit.aspx?h=0&r=0"
  );
  const data: string = raw.data;
  const list = data.split(";");
  const idList = list.map((item) => item.split(",")[0]);
  return idList[10];
};
