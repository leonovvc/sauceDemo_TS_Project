import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { testUsers } from '../../src/fixtures/testData';

test.describe('Smoke Tests - Login @smoke', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await page.goto('/');
  });
  
  test('Логин со стандартным юзером', async ({ page }) => {
    await loginPage.login(testUsers.standard.username, testUsers.standard.password);
    await inventoryPage.waitForPageLoad();
    
    await expect(page).toHaveURL(/.*inventory.html/);
  });
  
  test('Ошибка с некорректным юзером', async () => {
    await loginPage.login(testUsers.lockedOut.username, testUsers.lockedOut.password);
    
    expect(await loginPage.getErrorMessage()).toContain('Sorry, this user has been locked out');
  });
  
 // Визуальный тест временно выключен
  // test('should validate login page visual', async () => {
  //   await loginPage.verifyLoginPageVisual();
  // });
});