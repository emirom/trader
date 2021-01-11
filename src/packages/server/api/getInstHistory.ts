import got from "got/dist/source";

export const getDailyHistory = async (id: number) => {
  try {
    const response = await got.get(
      `http://tsetmc.com/tsev2/data/InstTradeHistory.aspx?i=${id}&Top=999999&A=0`
    );
    const result = extract(response.body);
    // console.log(result, typeof result);

    return {
      inscode: id,
      history: new Array(),
      daily: [...result],
    };
  } catch (err) {
    throw new err();
  }
};

const extract = (raw: string) => {
  const rows = raw.split(";");
  rows.pop(); // remove last undefined
  return rows.map((row) => checkColumns(row));
};

export const checkColumns = (row) => {
  const column = row.split("@");
  const data = column instanceof Error ? null : column;
  const [date, high, low, final, close, open, , value, volume, count] = data;
  const year = date.substr(0, 4),
    month = date.substr(4, 2),
    day = date.substr(6, 2);
  const tarikh = new Date(+year, +month - 1, +day).toLocaleDateString("fa-IR");

  return {
    tarikh,
    date: `${year}-${month}-${day}`,
    tno: +count,
    tvol: +volume,
    tval: +value,
    pf: +open,
    pmax: +high,
    pmin: +low,
    pc: +close,
    pl: +final,
  };
};
