import got from "got";

/**
 * @depricated get ids from symbols collection
 */
export const getAllIds = async () => {
  const raw = await got.get(
    "http://www.tsetmc.com/tsev2/data/MarketWatchInit.aspx?h=0&r=0"
  );
  const data: string = raw.body;
  const list = data.split(";");
  const idList = list.map((item) => item.split(",")[0]);
  return idList[10];
};
