import { After } from "@cucumber/cucumber";
import { EvidenceHelper } from "../../src/utils/EvidenceHelper";
import { browser, page } from "./before.hook";

After(async function (scenario) {
  if (page && scenario.result) {
    const statusRaw = scenario.result.status;
    const status = statusRaw === "PASSED" ? "SUCCESS" : "FAILED";
    const testName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, "_");
    await EvidenceHelper.captureFullPageScreenshot(
      page,
      `${testName}_${status}`
    );
  }
  if (page) await page.close();
  if (browser) await browser.close();
});
