import { addElement } from '../../utils/helpers';
import { Component } from '../component';
import html from './homepage.tpl.html';

import { ProductList } from '../productList/productList';
import { Hints } from '../hints/hints';

let searchPrompts = [
  'чехол iphone 13 pro',
  'коляски agex',
  'яндекс станция 2', 
];

class Homepage extends Component {
  popularProducts: ProductList;
  hints: Hints;

  constructor(props: any) {
    super(props);

    this.hints = new Hints({ searchPrompts })
    this.hints.attach(this.view.hints);

    this.popularProducts = new ProductList();
    this.popularProducts.attach(this.view.popular);
  }

  render() {

    this.hints.update(searchPrompts)

    fetch('/api/getPopularProducts')
      .then((res) => res.json())
      .then((products) => {
        this.popularProducts.update(products);
      });

    const isSuccessOrder = new URLSearchParams(window.location.search).get('isSuccessOrder');
    if (isSuccessOrder != null) {
      const $notify = addElement(this.view.notifies, 'div', { className: 'notify' });
      addElement($notify, 'p', {
        innerText:
          'Заказ оформлен. Деньги спишутся с вашей карты, менеджер может позвонить, чтобы уточнить детали доставки'
      });
    }
  }
}

export const homepageComp = new Homepage(html);
