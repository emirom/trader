import { getImageData } from "@canvas/image";
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

    const captchaPrefix = "Captcha?";
    const [response] = await Promise.all([
      page.goto(AGAH),
      page.waitForResponse((response: any) =>
        response.url().includes(captchaPrefix)
      ),
    ]);
    const buffer: Buffer = await response.buffer();
    // fs.writeFile(buffer, "./login.jpg", () => {});

    console.log(buffer);
    const code = await solveCaptcha(buffer);

    // await page.type("#username", process.env.agah_username);
    // await page.type("#password", process.env.agah_password);
    await page.type("#captcha", code);

    await Promise.all([
      page.click("#submit-btn"),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
  } catch (error) {
    console.log(error);
  }
};

const solveCaptcha = async (buffer) => {
  // console.log(imageUrl);

  const { createWorker } = Tesseract;
  const worker = createWorker({
    langPath: path.join(__dirname, "..", "lang-data"),
    logger: (m) => console.log(m),
  });
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");

  const image = await getImageData(buffer);
  const {
    data: { text: code },
  } = await worker.recognize(image);
  console.log(code);
  await worker.terminate();
  return code;
};
// tesseract.recognize(`${__dirname}/image.png`, (err, text) => { /* ... */ })
// tesseract.recognize(Buffer.from(/* ... */), (err, text) => { /* ... */ })
// tesseract.recognize(fs.createReadStream(/* ... */), (err, text) => { /* ... */ })
// tesseract.recognize('image.jpeg', { language: 'swe' }, (err, text) => { /* ... */ })
// tesseract.recognize('image.tiff').then(console.log, console.error)

// var baseStr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+EAAAPOCAIAAADv
// var imageBuffer = Buffer.from(baseStr , 'base64');
// Tesseract
//     .recognize(imageBuffer)
//     .progress(message => {
//       var progressStatus = message.status + " [" + Math.ceil(message.progress * 100) + "%]";
//       console.log(progressStatus);
//     })
