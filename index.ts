// import cheerio from "cheerio";
// import axios from "axios";
import fetch from "node-fetch";

// axios
//   .get("https://www.seo.ir/")
//   .then((res) => {
//     console.log("res", res);
//   })
//   .catch((err) => {
//     console.log("err", err);
//   });

// const url = "http://www.tsetmc.com/tsev2/data/TradeDetail.aspx?i=55254206302462116"
const url = "http://www.tsetmc.com/tsev2/data/TradeDetail.aspx?i=55254206302462116"


fetch(url)
  .then((res) => res.text())
  .then((text) => console.log(text));

//  ts-node index.ts