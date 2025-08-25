import * as cucumber from "@cucumber/cucumber";
const { Given, When, Then } = cucumber;
import { AuthService } from "../src/services/auth.service";
import { ProductPage } from "../src/pages/ProductPage";
import { expect } from "@playwright/test";
import { CheckoutPage } from "../src/pages/CheckoutPage";

let authService: AuthService;
let productPage: ProductPage;
let checkoutPage: CheckoutPage;

When("I proceed to checkout", async function () {
  checkoutPage = new CheckoutPage(this.page);
  await checkoutPage.gotoCart();
  await checkoutPage.gotoCheckout();
});

When("I complete the purchase with:", async function (table) {
  const [firstName, lastName, postalCode] = table.rows()[0];
  await checkoutPage.fillCheckoutForm(firstName, lastName, postalCode);
  await checkoutPage.finishPurchase();
});

Then("the purchase should be successful", async function () {
  expect(await checkoutPage.isPurchaseSuccess()).toBe(true);
});
