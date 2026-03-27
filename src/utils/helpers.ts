import { Page } from '@playwright/test';

export class Helpers {
  static async waitForNetworkIdle(page: Page, timeout: number = 5000): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }
  
  static async scrollToElement(page: Page, selector: string): Promise<void> {
    await page.locator(selector).scrollIntoViewIfNeeded();
  }
  
  static generateRandomString(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  static async retry<T>(
    fn: () => Promise<T>,
    retries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (retries === 0) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
      return this.retry(fn, retries - 1, delay);
    }
  }
  
  static formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }
}