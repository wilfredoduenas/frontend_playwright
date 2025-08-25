// src/interfaces/IProductPage.ts
import { Locator, Page } from "@playwright/test";

export interface IProductPage {
  addProductToCart(product: string): Promise<void>;
  getCartBadgeCount(): Promise<number>;
  verifyProductElements(): Promise<void>;
}
