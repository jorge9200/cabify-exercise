import React, {Component} from 'react';
import Store from './containers/Store'
import memoize from 'memoize-one';

class Checkout extends Component{

  constructor(props){
    super(props)

    // Initiate the cart state object with the products quantity to 0
    this.state = {
      cart: props.pricingRules.products.reduce((acc, cur) => ({ ...acc, [cur.id]: {
              price: cur.price,
              quantity: 0,
              totalPrice: 0,
            }}), {})
    }
  }

  // Public method scan, recieves itemId and adds the item to the cart
  scan(itemId){
    const newQuantity = this.state.cart[itemId].quantity + 1
    this._updateCart(itemId, newQuantity)
  }

  //Public method total, returns total price with discounts
  total() {
    return this._getTotalPrice() - this._getTotalDiscounted()
  }

  // Cart discounts memorized with their total discounted price for the cart state
  cartDiscounts = memoize(
    (cart, discounts) =>
      discounts.map(discount => ({
        totalDiscounted: discount.condition(cart) ? discount.formula(cart) : 0,
        ...discount
      }))
  )

  // Private method uptadeCart, revieves itemId and value and updates the cart item
  _updateCart(itemId, value) {
    // If not a number o inferior to zero, set to zero
    const newQuantity = !Number(value) || Number(value) < 0 ? 0 : Number(value)

    const newCart = {
      ...this.state.cart,
      [itemId]: {
        ...this.state.cart[itemId],
        quantity: newQuantity,
        totalPrice: this.state.cart[itemId].price * newQuantity
      }
    }

    this.setState({ cart: newCart })
  }

  // Private method getCartDiscounts, returns the the object cartDiscounts (an object with the discounts applied)
  _getCartDiscounts(){
    return this.cartDiscounts(this.state.cart, this.props.pricingRules.discounts)
  }

  // Private method getTotalPrice, returns total price without discounts
  _getTotalPrice(){
    return Object.values(this.state.cart).map(item => item.totalPrice).reduce((a, b) => a + b, 0)
  }

  // Private method getTotalDiscounted, returns total price discounted
  _getTotalDiscounted(){
    return this._getCartDiscounts().map(disc => disc.totalDiscounted).reduce((a, b) => a + b, 0)
  }

  // Render Checkout Store
  render() {
    return (
      <div className="App">
        <Store
          products={this.props.pricingRules.products}
          cart={this.state.cart}
          cartDiscounts={this._getCartDiscounts()}
          updateCart={this._updateCart.bind(this)}
          totalPrice={this._getTotalPrice()}
          total={this.total()}
        />
      </div>
    )
  }
}

export default Checkout;
