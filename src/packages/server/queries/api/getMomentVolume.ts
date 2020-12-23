// import axios from "axios";
import cheerio from "cheerio";
import { LocalStorage } from "node-localstorage";

const local = new LocalStorage("./scratch");

export const getMomentVolume = async (id: string) => {
  try {
    // const response = await axios.get(
    //   `http://www.tsetmc.com/tsev2/data/TradeDetail.aspx?i=${id}
    //   `
    // );
    // localStorage.setItem("data", response.data);
    const rows = local.getItem("rows");
    console.log(typeof rows);

    extract(local.getItem("data"));
  } catch (err) {
    console.log(err, id);
  }
};

const extract = (html: string) => {
  console.log("html", html);

  const rowsString = cheerio("row", "rows", html).text();
  const rowsCorrected = "\n" + rowsString;
  const rowsArray = rowsCorrected.split("\n\n");
  const cellsArray = rowsArray.map((row) => {
    const rows = row.split("\n");
    return {
      id: rows[0],
      time: rows[1],
      volume: rows[2],
      price: rows[3],
    };
  });

  console.log("cells", cellsArray);
  return cellsArray;
};
