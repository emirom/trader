// import cheerio from "cheerio";
// import axios from "axios";
// import fetch from "node-fetch";
import { assets as getAsset } from 'tsetmc-api'


// const url = "http://www.tsetmc.com/tsev2/data/TradeDetail.aspx?i=55254206302462116"
// const id = 55254206302462116
// // const daily = `http://www.tsetmc.com/tsev2/data/TradeDetail.aspx?i=${id}`
// const lastThirtyDays = `http://www.tsetmc.com/loader.aspx?ParTree=151311&i=${id}#`

// fetch(lastThirtyDays)
//   .then((res) => res.text())
//   .then((result) => console.log(result))
//   .catch(err => console.error(err, "err"))

// let res
// try {
//   res = await assets()
// }
// catch (err) {
//   console.log("assets err", err)
// }


// const getAssets = () => {
//   var assetsList
getAsset()
  .then(res => { console.log(res) })
  .catch(err => console.log("assets err", err))

  // setTimeout(() =>
  //   console.log(assetsList)
  //   , 3000);
  // return assetsList
// }


// const assets = getAssets()
// console.log(assets)
// const assetIds = assets && assets.map(asset => asset.id)
// console.log(assetIds)
