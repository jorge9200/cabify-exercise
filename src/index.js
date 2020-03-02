import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Checkout from './Checkout';
import * as serviceWorker from './serviceWorker';

import {products, discounts} from './samples/store-config'

const PRICING_RULES = {
  products: products,
  discounts: discounts
}

ReactDOM.render(
  <Checkout pricingRules={PRICING_RULES}/>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
