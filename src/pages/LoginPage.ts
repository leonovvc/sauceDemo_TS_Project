import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Локаторы
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private errorMessage: Locator;
  
  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }
  
  async waitForPageLoad(): Promise<void> {
    await this.waitForElement(this.usernameInput);
    await this.waitForElement(this.passwordInput);
  }
  
  async login(username: string, password: string): Promise<void> {
    await this.fillInput(this.usernameInput, username);
    await this.fillInput(this.passwordInput, password);
    await this.safeClick(this.loginButton);
  }
  
  async getErrorMessage(): Promise<string> {
    await this.waitForElement(this.errorMessage);
    return await this.errorMessage.textContent() || '';
  }
  
  async isErrorVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }
  
  // Визуальная проверка страницы логина
  async verifyLoginPageVisual(): Promise<void> {
    await this.takeScreenshot('login-page');
  }
}