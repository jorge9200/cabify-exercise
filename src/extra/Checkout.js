import React, {useMemo, useState, useCallback} from 'react'

const Checkout = ({
  pricingRules,
}) => {

  // Init cart with products setted to quantity = 0 and discount = 0
  const [cart, setCart] = useState(
    pricingRules.products.reduce((acc, cur) => ({ ...acc, [cur.id]: {
      price: cur.price,
      quantity: 0,
      totalPrice: 0,
      discount: 0,
      type: cur.id
    }}), {})
  )

  const cartDiscounts = useMemo(() => (
    pricingRules.discounts.map(discount => ({
      totalDiscounted: discount.condition(cart) ? discount.formula(cart) : 0,
      ...discount
    }))
  ),[cart, pricingRules.discounts])

  const withDiscounts = useMemo(() => (
    cartDiscounts.filter(discount => discount.totalDiscounted && discount.totalDiscounted > 0).length > 0
  ),[cartDiscounts])

  const totalDiscounted = useMemo(() => {
    let total = 0
    cartDiscounts.forEach(discount => total += discount.totalDiscounted)
    return total
  },[cartDiscounts])

  const nCartItems = useMemo(() => {
    let numberOfItems = 0
    Object.entries(cart).forEach(([key, value]) => numberOfItems += value.quantity)
    return numberOfItems
  },[cart])

  const totalPrice = useMemo(() => {
    let price = 0
    Object.entries(cart).forEach(([key, value]) => price += value.totalPrice)
    return price
  },[cart])

  const total = useMemo(() => (
    totalPrice - totalDiscounted
  ),[totalDiscounted, totalPrice])

  const setProduct = useCallback((product, value) => {
    // If not a number o inferior to zero, set to zero
    const newQuantity = !Number(value) || Number(value) < 0 ? 0 : Number(value)

    setCart({
      ...cart,
      [product]: {
        ...cart[product],
        quantity: newQuantity,
        totalPrice: (cart[product].price * newQuantity) - cart[product].discount
      }
    })
  },[cart])

  const renderProducts = useMemo(() => (
    <section className="products">
      <h1 className="main">Shopping cart</h1>
      <ul className="products-list tableHead">
        <li className="products-list-title row">
          <div className="col-product">Product details</div>
          <div className="col-quantity">Quantity</div>
          <div className="col-price">Price</div>
          <div className="col-total">Total</div>
        </li>
      </ul>
      <ul className="products-list">
        { !pricingRules.products || pricingRules.products.length <= 0 ? console.log('TODO: Empty state') :
          pricingRules.products.map(product => (
            <li key={product.id} className='product row'>
              <div className="col-product">
                <figure className="product-image">
                  <img src={`/assets/img/${product.img}`} alt={product.name} />
                  <div className="product-description">
                    <h1>{product.name}</h1>
                    <p className="product-code">{`Product code ${product.code}`}</p>
                  </div>
                </figure>
              </div>
              <div className="col-quantity">
                <button
                  className="count"
                  onClick={() => setProduct(product.id, --cart[product.id].quantity)}
                >-</button>
                <input
                  type="text"
                  className="product-quantity"
                  value={cart[product.id].quantity}
                  onChange={(e) => setProduct(product.id, e.target.value)}
                />
                <button
                  className="count"
                  onClick={() => setProduct(product.id, ++cart[product.id].quantity)}
                >+</button>
              </div>
              <div className="col-price">
                <span className="product-price">{product.price}</span
                ><span className="product-currency currency">€</span>
              </div>
              <div className="col-total">
                <span className="product-price">{cart[product.id].totalPrice}</span
                ><span className="product-currency currency">€</span>
              </div>
            </li>
          ))
        }
      </ul>
    </section>
  ),[pricingRules.products, setProduct, cart])

  const renderSummary = useMemo(() => (
    <aside className="summary">
      <h1 className="main">Order Summary</h1>
      <ul className="summary-items wrapper border">
        <li>
          <span className="summary-items-number">{`${nCartItems} Items`}</span>
          <span className="summary-items-price">
            {totalPrice}
            <span className="currency">€</span>
          </span>
        </li>
      </ul>
      { !withDiscounts ? null :
        <div className="summary-discounts wrapper-half border">
          <h2>Discounts</h2>
          <ul>
            { cartDiscounts.map(discount => (
                discount.totalDiscounted <= 0 ? null :
                <li key={discount.id}><span>{discount.name}</span><span>{`- ${discount.totalDiscounted} €`}</span></li>
              ))
            }
          </ul>
        </div>
      }
      <div className="summary-total wrapper">
        <ul>
          <li>
            <span className="summary-total-cost">Total cost</span
            ><span className="summary-total-price">{`${total} €`}</span>
          </li>
        </ul>
        <button type="submit">Checkout</button>
      </div>
    </aside>
  ),[cartDiscounts, nCartItems, totalPrice, withDiscounts, total])

  const renderCheckout = useMemo(() => (
    <React.Fragment>
      {renderProducts}
      {renderSummary}
    </React.Fragment>
  ),[renderProducts, renderSummary])

  return renderCheckout
}

export default Checkout
