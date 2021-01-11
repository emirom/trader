import got from "got/dist/source";
import { newAliveAgent } from "../utils/got";

export const watchLastLimits = async (id: number) => {
  const url = `http://www.tsetmc.com/tsev2/data/instinfodata.aspx?i=${id}&c=27`;
  const response = await got.get(url, newAliveAgent());
  const content = JSON.stringify(response.body);
  const parts = content.split(";");
  const prices = parts[0].split(",");
  const limitsRows = parts[2].split(",");
  const notEmptyRows = [limitsRows[0], limitsRows[1], limitsRows[2]];
  const limits = iterateOverLimits(notEmptyRows);
  console.log("_________", limits);

  return {
    pl: prices[3], // آخرین معامله
    pc: prices[4], // قیمت پایانی
    pf: prices[5], // اولین قیمت
    // ===============
    // z : zahlen (integer number), p :price, q : quantity, d: dealer, o: owner
  };
  // const bestLimits = parseBestLimits(parts[3]);
  console.log(parts);

  // return bestLimits;
};
const iterateOverLimits = (limitsRows) =>
  limitsRows.map((row, index) => {
    const columns = row.split("@");
    console.log(index, columns);
    return {
      ["zd" + (+index + 1)]: columns[0],
      ["qd" + (+index + 1)]: columns[1],
      ["pd" + (+index + 1)]: columns[2],
      ["po" + (+index + 1)]: columns[3],
      ["qo" + (+index + 1)]: columns[4],
      ["zo" + (+index + 1)]: columns[5],
    };
  });
