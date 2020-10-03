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
const id = 55254206302462116
// const daily = `http://www.tsetmc.com/tsev2/data/TradeDetail.aspx?i=${id}`
const lastThirtyDays = `http://www.tsetmc.com/loader.aspx?ParTree=151311&i=${id}#`

fetch(lastThirtyDays)
fetch(`http://members.tsetmc.com/tsev2/data/InstTradeHistory.aspx?i=${id}&Top=999999&A=0`, {
  "headers": {
    "accept": "text/plain, */*; q=0.01",
    "accept-language": "en-US,en;q=0.9",
    "proxy-connection": "keep-alive"
  },
  "referrer": "http://www.tsetmc.com/loader.aspx?ParTree=151311&i=55254206302462116",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
})
  .then((res) => res.text())
  .then((text) => console.log(text));

//  ts-node index.ts