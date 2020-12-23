// import { getMonthlyHistory } from "./queries/getMonthlyHistory";
// import { getAllIds } from "./queries/api/getAllIds";
import { getDayLastPrices } from "./queries/api/getDayLastPrices";

// import express from "express";
import mongo from "mongodb";

// const assetId = "40262275031537922";
(async function () {
  try {
    // const app = express();
    let db;
    mongo.connect(
      process.env.DB_NAME,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) {
          throw new Error("_________mongoErr:" + err.message);
        } else {
          db = client.db();
          // app.listen(5000);
        }
      }
    );

    // const;
    // const Ids = getAllIds()
    // Ids.map()
    // const res =
    const lastDay = await getDayLastPrices();
    console.log("lastDay", lastDay);
    // app.post('/create-data', function (req, res) {
    // Sending request to create a data
    // db.collection("data").insertOne({}, function (err, info) {
    //   res.json(info.ops[0]);
    // });
    // })

    // console.log(res[0]);
  } catch (error) {
    console.log("index___________error", error);
  }
})();
