import { Before } from "@cucumber/cucumber";
import { chromium, Page, Browser } from "playwright";

let browser: Browser;
let page: Page;

Before(async function () {
  browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  this.page = page;
});

export { browser, page }; // Para compartir instancia si es necesario
