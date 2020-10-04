// import cheerio from "cheerio";
// import axios from "axios";
// import fetch from "node-fetch";
import { assets as getAsset } from 'tsetmc-api'

//logs correctly
getAsset()
  .then(res => { console.log(res) })
  .catch(err => console.log("assets err", err))


// a func with try catch
// "target": "es2017",
// "module": "system",
const withTry = async () => {
  let res
  try {
    res = await getAsset()
  }
  catch (err) {
    console.log("assets err", err)
  }
  return res
}

const assests = await withTry()
console.log(assests)


// with then
const getAssets = () => {
  let assetsList
  getAsset()
    .then(res => { assetsList = res })
    .catch(err => console.log("assets err", err))
  return assetsList
}
const assets = getAssets()
console.log(assets)
