import { Component } from '../component';
import html from './catalog.tpl.html';
import AnalyticsService from '../../services/analytics.service';

import { ProductList } from '../productList/productList';

class Catalog extends Component {
  productList: ProductList;

  constructor(props: any) {
    super(props);

    this.productList = new ProductList();
    this.productList.attach(this.view.products);
  }

  async render() {
    const productsResp = await fetch('/api/getProducts');
    const products = await productsResp.json();
    this.productList.update(products);

    this._sendPageViewAnalytics();
  }

  private _sendPageViewAnalytics() {
    const url = window.location.href;
    const payload = { url };

    AnalyticsService.sendEvent('route', payload);
  }
}

export const catalogComp = new Catalog(html);
