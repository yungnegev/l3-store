import { Component } from '../component';
import html from './favorites.tpl.html';
import { Product } from '../product/product';
import { ProductData } from 'types';
import { favoritesService } from '../../services/favorites.service';
import AnalyticsService from '../../services/analytics.service';

class Favorites extends Component {
  products!: ProductData[];

  async render() {
    this.products = await favoritesService.get();

    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

    this.products.forEach((product) => {
      const productComp = new Product(product, { isHorizontal: false });
      productComp.render();
      productComp.attach(this.view.favorites);
    });

    this._sendPageViewAnalytics();
  }

  private _sendPageViewAnalytics() {
    const url = window.location.href;
    const payload = { url };

    AnalyticsService.sendEvent('route', payload);
  }

}

export const favoritesComp = new Favorites(html);