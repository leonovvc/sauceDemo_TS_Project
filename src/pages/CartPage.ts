import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { CartItem } from '../types';

export class CartPage extends BasePage {
  private cartList: Locator;
  private checkoutButton: Locator;
  private continueShoppingButton: Locator;
  
  constructor(page: Page) {
    super(page);
    this.cartList = page.locator('.cart_list');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }
  
  async waitForPageLoad(): Promise<void> {
    await this.waitForElement(this.cartList);
  }
  
  async getCartItems(): Promise<CartItem[]> {
    const items: CartItem[] = [];
    const cartItems = await this.page.locator('.cart_item').all();
    
    for (const item of cartItems) {
      const name = await item.locator('.inventory_item_name').textContent() || '';
      const priceText = await item.locator('.inventory_item_price').textContent() || '';
      const price = parseFloat(priceText.replace('$', ''));
      const quantityText = await item.locator('.cart_quantity').textContent() || '0';
      const quantity = parseInt(quantityText);
      
      items.push({
        id: name.toLowerCase().replace(/\s/g, '-'),
        name,
        price,
        description: '',
        quantity,
      });
    }
    
    return items;
  }
  
  async removeCartItem(productName: string): Promise<void> {
    const removeButton = this.page.locator(`.cart_item:has-text("${productName}") button`);
    await this.safeClick(removeButton);
  }
  
  async proceedToCheckout(): Promise<void> {
    await this.safeClick(this.checkoutButton);
  }
  
  async continueShopping(): Promise<void> {
    await this.safeClick(this.continueShoppingButton);
  }
  
  async getTotalItems(): Promise<number> {
    const items = await this.page.locator('.cart_item').count();
    return items;
  }
  
  // Визуальная проверка корзины
  async verifyCartVisual(): Promise<void> {
    await this.takeScreenshot('cart-page');
  }
}