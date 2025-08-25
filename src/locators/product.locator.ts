import { Page } from "@playwright/test";

export const ProductLocators = {
  buttonMenu: (page: Page) => page.getByRole("button", { name: "Open Menu" }),
  productBackpack: (page: Page) => page.locator("button[id='add-to-cart-sauce-labs-backpack']"),
  productBike: (page: Page) => page.locator("button[id='add-to-cart-sauce-labs-bike-light']"),
  productBolt: (page: Page) => page.locator("button[id='add-to-cart-sauce-labs-bolt-t-shirt']"),
  productFleece: (page: Page) => page.locator("button[id='add-to-cart-sauce-labs-fleece-jacket']"),
  productOnesie: (page: Page) => page.locator("button[id='add-to-cart-sauce-labs-onesie']"),
  cartBadge: (page: Page) => page.locator('[data-test="shopping-cart-badge"]'),
};
