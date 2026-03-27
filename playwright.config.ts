import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Загрузка переменных окружения
dotenv.config();

export default defineConfig({
  testDir: 'tests',
  timeout: 30000,
  fullyParallel: true, // Параллельный запуск тестов
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined, // Количество параллельных воркеров
  
  // Репортеры
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results.json' }],
    ['allure-playwright']
  ],
  
  // Конфигурация для визуальных тестов
  snapshotPathTemplate: '{testDir}/{testFileDir}/snapshots/{arg}{ext}',
  
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Настройки для визуальных тестов
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },
  
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'msedge',
      use: { 
        ...devices['Desktop Edge'],
        channel: 'msedge',
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
});