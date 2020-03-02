import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Checkout from './Checkout';
import {products, discounts} from './samples/store-config'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const PRICING_RULES = {
  products: products,
  discounts: discounts
}

describe('Testing cabify exercise', () => {
  it('should add two t-shirts and one cap, for a price of 50€', () => {
    const wrapper = mount(<Checkout pricingRules={PRICING_RULES} />)
    const instance = wrapper.instance()
    instance.scan('TSHIRT')
    instance.scan('CAP')
    instance.scan('TSHIRT')
    expect(instance.state.cart.TSHIRT.quantity).toBe(2)
    expect(instance.state.cart.CAP.quantity).toBe(1)
    expect(instance.total()).toBe(50)
  });

  it('should add three t-shirts, four caps and four mugs, for a price of 107€', () => {
    const wrapper = mount(<Checkout pricingRules={PRICING_RULES} />)
    const instance = wrapper.instance()
    instance.scan('TSHIRT')
    instance.scan('TSHIRT')
    instance.scan('TSHIRT')
    instance.scan('MUG')
    instance.scan('MUG')
    instance.scan('MUG')
    instance.scan('MUG')
    instance.scan('CAP')
    instance.scan('CAP')
    instance.scan('CAP')
    instance.scan('CAP')
    expect(instance.total()).toBe(107)
  });
});
