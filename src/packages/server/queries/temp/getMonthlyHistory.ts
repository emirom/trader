import puppeteer from "puppeteer";

export const getMonthlyHistory = async (id: string) => {
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
  'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
  await page.setUserAgent(userAgent);
  await page.setDefaultNavigationTimeout(0);
  await page.goto(`http://www.tsetmc.com/Loader.aspx?ParTree=151311&i=${id}#`, {
    waitUntil: "networkidle2",
  });

  await page.click(".menu2 .peru", { button: "left" });
  await page.waitForSelector("#InstPartition7", {
    timeout: 30000,
  });
  // await page.waitFor("*");
  // await page.waitForNavigation({
  //   waitUntil: "networkidle0",
  // });

  console.log("yyyyyyyy");
  // const data = await page.$("#InstPartition7 .table1");
  const data = await page.evaluate(() => {
    const tds = Array.from(
      document.querySelectorAll("table  #InstPartition7 ")
    );

    return tds;
    // .map((td) => td.innerText);
  });
  console.log("data", data);
  await browser.close();
};

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
// const [elementHandle] = await page.$x('.///@href');
// const propertyHandle = await elementHandle.getProperty('value');
// const propertyValue = await propertyHandle.jsonValue();
/**
 *
 *
 *
 *
 */
// const trs = Array.from(document.querySelectorAll("#ClientTypeBody tr"));
// const arr = [];
// for (let i = 1; i < trs.length; i += 6) {
//   arr.push(trs[i].innerText
//       .replace(new RegExp("\t", "g"), ", ")
//       .replace(new RegExp("حجم", "g"), "")
//       .replace(/ \([^)]+\)/g, "")
//       .replace(",", ""));
//   arr.push('\n');
// }
// return arr.toString();

// import cheerio from 'cheerio'
// import { Got } from "got/dist/source";

/**
 *
 *
 *
 *
 */
// export const getMonthlyHistory = async (id: string, got: Got) => {
//     const url = `http://www.tsetmc.com/loader.aspx?ParTree=151311&i=${id}`;

//     const body = (await got.get(url)).body;
//     const $ = cheerio(body);
//     $.find( 'div > div > a', )
// $(html).
