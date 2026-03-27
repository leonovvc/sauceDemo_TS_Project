import { UserCredentials, Product } from '../types';

export const testUsers = {
  standard: {
    username: process.env.AUTH_LOGIN || 'standard_user',
    password: process.env.AUTH_PASSWORD || 'secret_sauce',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  performanceGlitch: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  error: {
    username: 'error_user',
    password: 'secret_sauce',
  },
  visual: {
    username: 'visual_user',
    password: 'secret_sauce',
  },
};

export const testProducts: Product[] = [
  {
    id: 'backpack',
    name: 'Sauce Labs Backpack',
    price: 29.99,
    description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
  },
  {
    id: 'bike-light',
    name: 'Sauce Labs Bike Light',
    price: 9.99,
    description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
  },
  {
    id: 'bolt-t-shirt',
    name: 'Sauce Labs Bolt T-Shirt',
    price: 15.99,
    description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
  },
];

export const sortOptions = {
  az: 'Name (A to Z)',
  za: 'Name (Z to A)',
  lohi: 'Price (low to high)',
  hilo: 'Price (high to low)',
};