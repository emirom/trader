// import cheerio from "cheerio";
// import axios from "axios";
// import fetch from "node-fetch";
import { assets as getAsset } from 'tsetmc-api'

//logs correctly
getAsset()
  .then(res => { console.log(res) })
  .catch(err => console.log("assets err", err))


// a func with try catch
// top level await fails in nodejs12 (LTS) the next setting are doors to new errors!
// "target": "es2017",
// "module": "system",
// const withTry = async () => {
//   let res
//   try {
//     res = await getAsset()
//   }
//   catch (err) {
//     console.log("assets err", err)
//   }
//   return res
// }

// const assests = await withTry()
// console.log(assests)


// with then
const withThen = () => {
  let assetsList
  getAsset()
    .then(res => {
      console.log("res in then", res)
      assetsList = res
    })
    .catch(err => console.log("assets err", err))
  return assetsList
}
const assets = withThen()
console.log(assets)
