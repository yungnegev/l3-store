import localforage from 'localforage';
import { ProductData } from 'types';

const DB = '__wb-favorites';

class FavoritesService {
  init() {
    this._updBtnVisibility();
  }

  async addProduct(product: ProductData) {
    const products = await this.get();
    await this.set([...products, product]);
  }

  async removeProduct(product: ProductData) {
    const products = await this.get();
    await this.set(products.filter(({ id }) => id !== product.id));
  }

  async clear() {
    await localforage.removeItem(DB);
    this._updBtnVisibility();
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(DB)) || [];
  }

  async set(data: ProductData[]) {
    await localforage.setItem(DB, data);
    this._updBtnVisibility();
  }

  async isInFavorites(product: ProductData) {
    const products = await this.get();
    return products.some(({ id }) => id === product.id);
  }

  private async _updBtnVisibility() {
    const products = await this.get();
    const visible = products.length > 0;

    //@ts-ignore
    document.querySelectorAll('.favoritesBtn').forEach(($el: HTMLElement) => ($el.style.visibility = visible ? 'visible' : 'hidden'));
  }
}

export const favoritesService = new FavoritesService();