import got from "got/dist/source";

export const getInstHistory = async (id: string) => {
  try {
    const response = await got.get(
      `http://tsetmc.com/tsev2/data/InstTradeHistory.aspx?i=${id}&Top=999999&A=0`
    );
    const result = extract(response.body);
    return {
      id,
      ...result,
    };
  } catch (err) {
    throw new err();
  }
};

const extract = (raw: string) => {
  return raw.split(";").map((row) => {
    // .filter((row) => row)
    const [
      date,
      high,
      low,
      final,
      close,
      open,
      ,
      value,
      volume,
      count,
    ] = row.split("@");
    const year = date.substr(0, 4),
      month = date.substr(4, 2),
      day = date.substr(6, 2);
    const tarikh = new Date(+year, +month - 1, +day).toLocaleDateString(
      "fa-IR"
    );

    return {
      tarikh,
      date: `${year}-${month}-${day}`,
      count: +count,
      volume: +volume,
      value: +value,
      open: +open,
      high: +high,
      low: +low,
      close: +close,
      final: +final,
    };
  });
};
