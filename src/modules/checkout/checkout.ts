import { Component } from '../component';
import { Product } from '../product/product';
import html from './checkout.tpl.html';
import { formatPrice } from '../../utils/helpers';
import { genUUID } from '../../utils/helpers';
import { cartService } from '../../services/cart.service';
import { ProductData } from 'types';
import AnalyticsService from '../../services/analytics.service';

class Checkout extends Component {
  products!: ProductData[];

  async render() {
    this.products = await cartService.get();
    this._sendPageViewAnalytics()

    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

    this.products.forEach((product) => {
      const productComp = new Product(product, { isHorizontal: true });
      productComp.render();
      productComp.attach(this.view.cart);
    });

    const totalPrice = this.products.reduce((acc, product) => (acc += product.salePriceU), 0);
    this.view.price.innerText = formatPrice(totalPrice);

    this.view.btnOrder.onclick = this._makeOrder.bind(this);
  }

  private async _makeOrder() {
    await cartService.clear();
    fetch('/api/makeOrder', {
      method: 'POST',
      body: JSON.stringify(this.products)
    });

    this._sendCheckoutAnalytics();

    window.location.href = '/?isSuccessOrder';
  }

  private _sendCheckoutAnalytics() {
    const productIds = this.products.map((product) => product.id);
    const totalPrice = this.products.reduce((acc, product) => (acc += product.salePriceU), 0);
    const orderId = genUUID();
    const payload = {
      orderId,
      totalPrice,
      productIds
    }
    AnalyticsService.sendEvent('checkout', payload);
  }

  private _sendPageViewAnalytics() {
    const url = window.location.href;
    const payload = { url };

    AnalyticsService.sendEvent('route', payload);
  }
}

export const checkoutComp = new Checkout(html);
