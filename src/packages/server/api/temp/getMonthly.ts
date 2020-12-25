// import { chromium } from "playwright";

// export const getMonthly = async (id: string) => {
//   // process.env.DEBUG = 'pw:browser*';
//   const browser = await chromium.launch({ headless: false });
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   const url = `http://www.tsetmc.com/loader.aspx?ParTree=151311&i=${id}`;
//   await page.goto(url);
//   await page.click(".menu2 .peru", { button: "left" });
//   await page.waitForTimeout(50000);
//   //   await page.waitForSelector("div .ltr .in", {
//   //     timeout: 0,
//   //   });
//   const data = await page.evaluate(() => {
//     const tds = Array.from(
//       document.querySelectorAll("table #InstPartition7 tr")
//     );

//     return tds;
//     // .map((td) => td.innerText);
//   });
//   console.log("data", data);
//   await browser.close();
// };
