// src/pages/CheckoutPage.ts
import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  private readonly cartButton: Locator;
  private readonly checkoutButton: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton: Locator;
  private readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.successMessage = page.locator('.complete-header');
  }

  async gotoCart(): Promise<void> {
    await this.cartButton.click();
  }

  async gotoCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async finishPurchase(): Promise<void> {
    await this.finishButton.click();
  }

  async isPurchaseSuccess(): Promise<boolean> {
    return await this.successMessage.isVisible();
  }
}
