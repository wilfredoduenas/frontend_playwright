
import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ILoginPage } from "../interfaces/ILoginPage";


export class LoginPage extends BasePage implements ILoginPage {

  private readonly titleLogin: Locator;
  private readonly inputUsername: Locator;
  private readonly inputPassword: Locator;
  private readonly buttonLogin: Locator;
  private readonly titleLoginSuccess: Locator;

  private loginElementLocators = [
    () => this.titleLogin,
    () => this.inputUsername,
    () => this.inputPassword,
    () => this.buttonLogin,
  ];

  constructor(page: Page) {
    super(page);
    this.titleLogin = this.page.getByText("Swag Labs");
    this.inputUsername = this.page.locator('[data-test="username"]');
    this.inputPassword = this.page.locator('[data-test="password"]');
    this.buttonLogin = this.page.locator('[data-test="login-button"]');
    this.titleLoginSuccess = this.page.locator('[data-test="title"]');
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
