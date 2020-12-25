import { Got } from "got/dist/source";

export const getHaghighiHoghughi = async (id: string, got: Got) => {
  const url = `http://www.tsetmc.com/tsev2/data/clienttype.aspx?i=${id}`;

  const body = (await got.get(url)).body;
  // const local    localStorage.setItem("haghighi", body);
  const rows = JSON.stringify(body).split(";");
  const haghighi_hoghughi = rows.map((row: string) => {
    const columns = row.split(",");
    return {
      date: columns[0],
      haghighi_buy_count: columns[1],
      hoghughi_buy_count: columns[2],
      haghighi_sell_count: columns[3],
      hoghughi_sell_count: columns[4],
      haghighi_buy_volume: columns[5],
      hoghughi_buy_volume: columns[6],
      haghighi_sell_volume: columns[7],
      hoghughi_sell_volume: columns[8],
      haghighi_buy_value: columns[9],
      hoghughi_buy_value: columns[10],
      haghighi_sell_value: columns[11],
      hoghughi_sell_value: columns[12],
    };
  });
  return haghighi_hoghughi;
};
