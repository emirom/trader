import { Request, Response } from "express";
import path from "path";
import puppeteer from "puppeteer";
import Tesseract from "tesseract.js";
export const login = async (_req: Request, res: Response) => {
  try {
    await loginPuppeteer();
    res.status(200).send("login successfully :)");
  } catch (error) {
    res.status(500).send("login err:" + error);
  }
};

export const loginPuppeteer = async () => {
  try {
    const AGAH = "https://online.agah.com/Auth/Login?ReturnUrl=%2f#/";
    const browser = await puppeteer.launch({
      headless: false,
      // slowMo:10,
    });

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({ width: 1200, height: 720 });
    await page.goto(AGAH, { waitUntil: "networkidle0" }); // wait until page load
    await page.type("#username", process.env.agah_username);
    await page.type("#password", process.env.agah_password);
    const captchaImage = await page.evaluate(() =>
      document.getElementById("imgcpatcha").getAttribute("src")
    );

    // captcha
    const captchaUrl = "https://online.agah.com" + captchaImage;

    // const buffer = await makeBuffer(captchaUrl);
    const code = await solveCaptcha(captchaUrl);
    await page.type("#captcha", code);

    // click and wait for navigation
    await Promise.all([
      page.click("#submit-btn"),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
  } catch (error) {
    console.log(error);
  }
};

// var makeBuffer = async (url) => {
//   // const cw = fs.createWriteStream(filename);
//   const stream = got.stream(url);
//   const chunks = [];
//   for await (let chunk of stream) {
//     chunks.push(chunk);
//   }
//   return Buffer.concat(chunks).toString("base64");
//   //   stream
//   //     .pipe(cw)
//   //     .on("close", () => console.log(`download ${filename} completed!`));
// };
const solveCaptcha = async (imageUrl: string) => {
  const { createWorker } = Tesseract;
  const worker = createWorker({
    langPath: path.join(__dirname, "..", "lang-data"),
    logger: (m) => console.log(m),
  });

  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const {
    data: { text: code },
  } = await worker.recognize(imageUrl);
  console.log(code);
  await worker.terminate();
  return code;
};
