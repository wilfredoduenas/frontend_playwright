import { Page } from "@playwright/test";

export const LoginLocators = {
  titleLogin: (page: Page) => page.getByText("Swag Labs"),
  inputUsername: (page: Page) => page.locator('[data-test="username"]'),
  inputPassword: (page: Page) => page.locator('[data-test="password"]'),
  buttonLogin: (page: Page) => page.locator('[data-test="login-button"]'),
  titleLoginSuccess: (page: Page) => page.locator('[data-test="title"]'),
  loginErrorMessage: (page: Page) => page.locator('[data-test="error"]'),
};
