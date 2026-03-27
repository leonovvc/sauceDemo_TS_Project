// Типы для пользователей
export interface UserCredentials {
  username: string;
  password: string;
}

// Типы для продуктов
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

// Типы для конфигурации
export interface TestConfig {
  env: 'prod' | 'staging';
  baseUrl: string;
  credentials: UserCredentials;
  visualThreshold: number;
}

// Типы для локаторов
export interface Selector {
  selector: string;
  description?: string;
}