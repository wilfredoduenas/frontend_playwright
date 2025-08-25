

import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ILoginPage } from "../interfaces/ILoginPage";
import { LoginLocators } from "../locators/login.locator";


export class LoginPage extends BasePage implements ILoginPage {

  // Locators provistos por LoginLocators
  private readonly titleLogin: Locator;
  private readonly inputUsername: Locator;
  private readonly inputPassword: Locator;
  private readonly buttonLogin: Locator;
  private readonly titleLoginSuccess: Locator;
  private readonly loginErrorMessage: Locator;

  private loginElementLocators: Array<() => Locator>;

  constructor(page: Page) {
    super(page);
    this.titleLogin = LoginLocators.titleLogin(page);
    this.inputUsername = LoginLocators.inputUsername(page);
    this.inputPassword = LoginLocators.inputPassword(page);
    this.buttonLogin = LoginLocators.buttonLogin(page);
    this.titleLoginSuccess = LoginLocators.titleLoginSuccess(page);
    this.loginErrorMessage = LoginLocators.loginErrorMessage(page);

    this.loginElementLocators = [
      () => this.titleLogin,
      () => this.inputUsername,
      () => this.inputPassword,
      () => this.buttonLogin,
    ];
  }


  public async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  public async enterUsername(username: string): Promise<void> {
    await this.inputUsername.fill(username);
  }

  public async enterPassword(password: string): Promise<void> {
    await this.inputPassword.fill(password);
  }

  public async clickLogin(): Promise<void> {
    await this.buttonLogin.click();
  }

  public async isHomePageVisible(): Promise<boolean> {
    return await this.titleLoginSuccess.isVisible();
  }

  public async verifyLoginElements(): Promise<void> {
    await this.verifySection(this.loginElementLocators, "Login");
  }

  public async usernameFieldShouldHaveFocus(): Promise<void> {
    await expect(this.inputUsername).toBeFocused();
  }

  public async loginButtonShouldBeDisabled(): Promise<void> {
    await expect(this.buttonLogin).toBeDisabled();
  }

  public async isLoginErrorMessageVisible(): Promise<boolean> {
    return await this.loginErrorMessage.isVisible();
  }

  public async isLoaded(): Promise<void> {
    await this.page.waitForLoadState("load");
    const state = await this.page.evaluate(() => document.readyState);
    expect(state).toBe("complete");
  }

  private async verifySection(
    locators: Array<() => any>,
    sectionName: string
  ): Promise<void> {
    for (const locatorFn of locators) {
      try {
        const locator = locatorFn();
        await expect(locator).toBeVisible({ timeout: 7000 });
      } catch (error) {
        console.error(
          `Elemento no visible en sección [${sectionName}]:`,
          error
        );
        throw error;
      }
    }
  }

}
