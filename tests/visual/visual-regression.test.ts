import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CartPage } from '../../src/pages/CartPage';
import { testUsers } from '../../src/fixtures/testData';

test.describe('Visual Regression Tests @visual', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  
  test('Должен быть скрин страницы логина', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.waitForPageLoad();
    await expect(page).toHaveScreenshot('login-page-initial.png', {
      maxDiffPixels: 100,
      threshold: 0.1,
    });
  });
  
  test('Должен быть скрин с ошибкой логина', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('invalid', 'credentials');
    await expect(page).toHaveScreenshot('login-page-error.png', {
      maxDiffPixels: 100,
      threshold: 0.1,
    });
  });
  
  test('Должен быть скрин станицы inventory', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    
    await loginPage.login(testUsers.standard.username, testUsers.standard.password);
    await inventoryPage.waitForPageLoad();
    
    await expect(page).toHaveScreenshot('inventory-page.png', {
      maxDiffPixels: 200,
      threshold: 0.1,
    });
  });
  
  test('Должен быть скрин станицы cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    
    await loginPage.login(testUsers.standard.username, testUsers.standard.password);
    await inventoryPage.waitForPageLoad();
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.waitForPageLoad();
    
    await expect(page).toHaveScreenshot('cart-page-with-item.png', {
      maxDiffPixels: 100,
      threshold: 0.1,
    });
  });
  
  test('Должен быть скрин адаптивный под мобилку', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const loginPage = new LoginPage(page);
    await loginPage.waitForPageLoad();
    
    await expect(page).toHaveScreenshot('login-page-mobile.png', {
      maxDiffPixels: 100,
      threshold: 0.1,
    });
  });
});