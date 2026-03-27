import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CartPage } from '../../src/pages/CartPage';
import { testUsers, testProducts, sortOptions } from '../../src/fixtures/testData';

test.describe('Regression Tests - Products @regression', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    
    await page.goto('/');
    await loginPage.login(testUsers.standard.username, testUsers.standard.password);
    await inventoryPage.waitForPageLoad();
  });
  
  test('Добавление товара в корзину и проверка наличия в корзине', async () => {
    const product = testProducts[0];
    
    await inventoryPage.addProductToCart(product.name);
    await inventoryPage.goToCart();
    await cartPage.waitForPageLoad();
    
    const cartItems = await cartPage.getCartItems();
    expect(cartItems).toHaveLength(1);
    expect(cartItems[0].name).toBe(product.name);
    expect(cartItems[0].price).toBe(product.price);
  });
  
  test('Сортировка товаров по цене от низкой к высокой', async () => {
    await inventoryPage.sortProductsBy('lohi');
    
    const products = await inventoryPage.getAllProducts();
    const prices = products.map(p => p.price);
    const sortedPrices = [...prices].sort((a, b) => a - b);
    
    expect(prices).toEqual(sortedPrices);
  });
  
  test('Проверка деталей продукта', async () => {
    const product = testProducts[0];
    const productDetails = await inventoryPage.getProductDetails(product.name);
    
    expect(productDetails).not.toBeNull();
    expect(productDetails?.name).toBe(product.name);
    expect(productDetails?.price).toBe(product.price);
    expect(productDetails?.description).toBe(product.description);
  });
  
 // test('Проверка визуального оформления корзины', async () => {
   // await inventoryPage.verifyInventoryVisual();
  //});
  
  test('Добавление нескольких продуктов в корзину', async () => {
    for (const product of testProducts) {
      await inventoryPage.addProductToCart(product.name);
    }
    
    await inventoryPage.goToCart();
    await cartPage.waitForPageLoad();
    
    const cartItems = await cartPage.getCartItems();
    expect(cartItems).toHaveLength(testProducts.length);
    
    for (let i = 0; i < testProducts.length; i++) {
      expect(cartItems[i].name).toBe(testProducts[i].name);
    }
  });
});