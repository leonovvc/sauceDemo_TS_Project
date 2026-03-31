# Base Playwright Project (TypeScript)

Проект автоматизации тестирования на TypeScript с использованием Playwright, поддерживающий параллельный запуск, несколько браузеров и визуальное регрессионное тестирование.


## 📋 Требования

- Node.js 18+
- npm или yarn

## 🔧 Установка

1. **Клонировать репозиторий**
- git clone <repository-url>
- cd base_playwright_project_ts

2. **Установить зависимости**
- npm install

3. **Установить Playwright**
- npx playwright install

4. **Настроить переменные окружения**
- cp .env.example .env
# Отредактировать .env файл с вашими данными

5. **Запуск тестов**
# Все тесты
- npm test

# Дымовые тесты
- npm run test:smoke

# Регрессионные тесты
- npm run test:regression

# Визуальные тесты
- npm run test:visual

# Только Chrome
npm run test:chrome

# Только Edge
npm run test:edge

# С открытым браузером
npm run test:headed

# Режим отладки
npm run test:debug

# Отчеты
После выполнения тестов отчеты доступны:

- HTML Report: npm run report

- JSON Report: test-results.json

- Allure Report: allure generate allure-results && allure open

# Отладка
- Режим отладки: npm run test:debug
- Просмотр трейсов: В HTML отчете кликнуть на тест -> Trace
- Скриншоты при падении: Сохраняются в test-results/

 ### Структура проекта
 ```text

sauceDemo_TS_Project/
├── .github/
│ └── workflows/
│ └── playwright.yml # GitHub Actions CI/CD
├── src/
│ ├── pages/
│ │ ├── BasePage.ts # Базовый класс для всех страниц
│ │ ├── LoginPage.ts # Страница авторизации
│ │ ├── InventoryPage.ts # Каталог товаров
│ │ └── CartPage.ts # Корзина
│ ├── types/
│ │ └── index.ts # TypeScript интерфейсы (Product, UserCredentials и др.)
│ ├── fixtures/
│ │ └── testData.ts # Тестовые пользователи, товары, опции сортировки
│ └── utils/
│ └── helpers.ts # Вспомогательные функции (retry, скролл, random)
├── tests/
│ ├── smoke/
│ │ └── login.smoke.test.ts # Дымовые тесты логина
│ ├── regression/
│ │ └── products.regression.test.ts # Регрессионные тесты товаров и корзины
│ └── visual/
│ └── visual-regression.test.ts # Визуальные тесты (скриншоты)
├── .env.example # Пример переменных окружения
├── .gitignore
├── playwright.config.ts # Конфигурация Playwright
├── tsconfig.json # Конфигурация TypeScript
├── package.json
└── README.me
