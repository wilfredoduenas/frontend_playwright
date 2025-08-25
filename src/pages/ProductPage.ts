// src/pages/ProductPage.ts
import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { IProductPage } from "../interfaces/IProductPage";
import { ProductLocators } from "../locators/product.locator";

export class ProductPage extends BasePage implements IProductPage {
  private readonly buttonMenu: Locator;
  private readonly productBackpack: Locator;
  private readonly productBike: Locator;
  private readonly productBolt: Locator;
  private readonly productFleece: Locator;
  private readonly productOnesie: Locator;
  private readonly cartBadge: Locator;

  private productElementLocators: Array<() => Locator>;

  constructor(page: Page) {
    super(page);
    this.buttonMenu = ProductLocators.buttonMenu(page);
    this.productBackpack = ProductLocators.productBackpack(page);
    this.productBike = ProductLocators.productBike(page);
    this.productBolt = ProductLocators.productBolt(page);
    this.productFleece = ProductLocators.productFleece(page);
    this.productOnesie = ProductLocators.productOnesie(page);
    this.cartBadge = ProductLocators.cartBadge(page);
    this.productElementLocators = [
      () => this.buttonMenu,
      () => this.productBackpack,
      () => this.productBike,
      () => this.productBolt,
      () => this.productFleece,
      () => this.productOnesie,
    ];
  }

  async addProductToCart(product: string): Promise<void> {
    switch (product) {
      case "backpack":
        await this.productBackpack.click();
        break;
      case "bike":
        await this.productBike.click();
        break;
      case "bolt":
        await this.productBolt.click();
        break;
      case "fleece":
        await this.productFleece.click();
        break;
      case "onesie":
        await this.productOnesie.click();
        break;
      default:
        throw new Error(`Producto no soportado: ${product}`);
    }
  }

  /**
   * Agrega una lista de productos al carrito en una sola sesión.
   * Ejemplo: await productPage.addProductsToCart(["backpack", "bike", "bolt"]);
   */
  async addProductsToCart(products: string[]): Promise<void> {
    for (const product of products) {
      await this.addProductToCart(product);
    }
  }

  async getCartBadgeCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.textContent();
      return text ? parseInt(text) : 0;
    }
    return 0;
  }

  async verifyProductElements(): Promise<void> {
    for (const locatorFn of this.productElementLocators) {
      await expect(locatorFn()).toBeVisible({ timeout: 7000 });
    }
  }
}
