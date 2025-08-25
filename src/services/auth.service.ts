// src/services/auth.service.ts
import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

export interface IAuthService {
  login(username: string, password: string): Promise<void>;
}

export class AuthService implements IAuthService {
  private loginPage: LoginPage;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
  }

  async login(username: string, password: string): Promise<void> {
    await this.loginPage.goto(LoginPage.HOME_URL);
    await this.loginPage.enterUsername(username);
    await this.loginPage.enterPassword(password);
    await this.loginPage.clickLogin();

    if (!(await this.loginPage.isHomePageVisible())) {
      throw new Error("Login failed: homepage not visible");
    }
  }
}
