// import { getMonthlyHistory } from "./queries/getMonthlyHistory";
// import { getAllIds } from "./queries/api/getAllIds";
// import { getDayLastPrices } from "./queries/api/getDayLastPrices";

import { startServer } from "./server";

(async function () {
  try {
    const db = startServer();

    // const;
    // const Ids = getAllIds()
    // Ids.map()
    // const res =
    // const lastDay = await getDayLastPrices();
    // console.log("lastDay", lastDay);
    // app.post("/create-ih", function (req, res) {
    //   console.log("req", req);
    //   // Sending request to create a data
    db.Ih.insertOne({}, function (err, info) {
      info.ops[0];
      if (err) {
        console.log("err", err);
      }
      //   });
    });

    // console.log(res[0]);
  } catch (error) {
    console.log("index___________error", error);
  }
})();
