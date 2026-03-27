import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }
  
  // Ожидание загрузки страницы
  abstract waitForPageLoad(): Promise<void>;
  
  // Скриншот для визуального тестирования
  async takeScreenshot(name: string): Promise<void> {
    await expect(this.page).toHaveScreenshot(`${name}.png`, {
      maxDiffPixels: 100,
      threshold: parseFloat(process.env.VISUAL_THRESHOLD || '0.1'),
    });
  }
  
  // Ожидание элемента
  protected async waitForElement(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }
  
  // Безопасный клик
  protected async safeClick(locator: Locator): Promise<void> {
    await this.waitForElement(locator);
    await locator.click();
  }
  
  // Заполнение поля
  protected async fillInput(locator: Locator, text: string): Promise<void> {
    await this.waitForElement(locator);
    await locator.clear();
    await locator.fill(text);
  }
}