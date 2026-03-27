import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Product } from '../types';

export class InventoryPage extends BasePage {
  private inventoryContainer: Locator;
  private cartIcon: Locator;
  private sortDropdown: Locator;
  private inventoryItems: Locator;
  
  constructor(page: Page) {
    super(page);
    this.inventoryContainer = page.locator('.inventory_container');
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
  }
  
  async waitForPageLoad(): Promise<void> {
    await this.waitForElement(this.inventoryContainer);
  }
  
  async addProductToCart(productName: string): Promise<void> {
    const addButton = this.page.locator(`.inventory_item:has-text("${productName}") button`);
    await this.safeClick(addButton);
  }
  
  async removeProductFromCart(productName: string): Promise<void> {
    const removeButton = this.page.locator(`.inventory_item:has-text("${productName}") button`);
    await this.safeClick(removeButton);
  }
  
  async getProductDetails(productName: string): Promise<Product | null> {
    const product = this.page.locator(`.inventory_item:has-text("${productName}")`);
    
    if (!await product.isVisible()) return null;
    
    const name = await product.locator('.inventory_item_name').textContent() || '';
    const priceText = await product.locator('.inventory_item_price').textContent() || '';
    const price = parseFloat(priceText.replace('$', ''));
    const description = await product.locator('.inventory_item_desc').textContent() || '';
    
    return {
      id: name.toLowerCase().replace(/\s/g, '-'),
      name,
      price,
      description,
    };
  }
  
  async sortProductsBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    const optionMap = {
      'az': 'az',
      'za': 'za', 
      'lohi': 'lohi',
      'hilo': 'hilo'
    };
    
    // Способ 1: Использовать selectOption
    await this.sortDropdown.selectOption(optionMap[option]);
    
    // Способ 2: Если selectOption не работает, используйте клик по селекту
    // await this.sortDropdown.click();
    // await this.page.locator(`option[value="${optionMap[option]}"]`).click();
  }
  
  async goToCart(): Promise<void> {
    await this.safeClick(this.cartIcon);
  }
  
  async getAllProducts(): Promise<Product[]> {
    const products: Product[] = [];
    const items = await this.inventoryItems.all();
    
    for (const item of items) {
      const name = await item.locator('.inventory_item_name').textContent() || '';
      const priceText = await item.locator('.inventory_item_price').textContent() || '';
      const price = parseFloat(priceText.replace('$', ''));
      const description = await item.locator('.inventory_item_desc').textContent() || '';
      
      products.push({
        id: name.toLowerCase().replace(/\s/g, '-'),
        name,
        price,
        description,
      });
    }
    
    return products;
  }
  
  // Визуальная проверка инвентаря
  async verifyInventoryVisual(): Promise<void> {
    await this.takeScreenshot('inventory-page');
  }
}