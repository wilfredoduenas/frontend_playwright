import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { LoginPage } from "../src/pages/LoginPage";
import { expect } from "@playwright/test";

setDefaultTimeout(20000);

let loginPage: LoginPage;

Given("I am on the login page", async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.goto(LoginPage.HOME_URL);
  await this.page.waitForLoadState("load");
  await this.page.waitForSelector('[data-test="username"]', { timeout: 15000 });
});

When(
  "I enter credentials {string} and {string}",
  async function (username, password) {
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
  }
);

When("I click the login button", async function () {
  await loginPage.clickLogin();
});

When("the page is loaded", async function () {
  await loginPage.isLoaded();
});

Then("I should see the homepage", async function () {
  expect(await loginPage.isHomePageVisible()).toBe(true);
});

Then("the username field should have focus", async function () {
  await loginPage.usernameFieldShouldHaveFocus();
});

Then("the login button should be disabled", async function () {
  await loginPage.loginButtonShouldBeDisabled();
});

Then("all login elements should be visible", async function () {
  await loginPage.verifyLoginElements();
});

Then("the login error message should be visible", async function () {
  expect(await loginPage.isLoginErrorMessageVisible()).toBe(true);
});
