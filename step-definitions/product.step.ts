import * as cucumber from "@cucumber/cucumber";
const { Given, When, Then } = cucumber;
import { AuthService } from "../src/services/auth.service";
import { ProductPage } from "../src/pages/ProductPage";
import { expect } from "@playwright/test";

let authService: AuthService;
let productPage: ProductPage;

Given("I am logged in as {string} with password {string}", async function (username, password) {
  authService = new AuthService(this.page);
  await authService.login(username, password);
  productPage = new ProductPage(this.page);
});

When("I add {int} {word} to the cart", async function (count, product) {
  for (let i = 0; i < count; i++) {
    await productPage.addProductToCart(product);
  }
});

When("I add the following products to the cart:", async function (table) {
  const products = table.rows().map((row: string[]) => row[0]);
  await productPage.addProductsToCart(products);
});

Then("the cart badge should show {int}", async function (expectedCount) {
  const badgeCount = await productPage.getCartBadgeCount();
  expect(badgeCount).toBe(expectedCount);
});

Then("all product elements should be visible", async function () {
  await productPage.verifyProductElements();
});
