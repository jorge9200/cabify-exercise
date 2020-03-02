import React from 'react'

const ProductList = ({
  products,
  cart,
  updateCart,
  setItemSelected,
}) => (
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
      { !products || products.length <= 0 ? console.log('TODO: Empty state') :
        products.map(product => (
          <li key={product.id} className='product row'>
            <div className="col-product">
              <figure className="product-image" onClick={() => setItemSelected(product)}>
                <img src={`/assets/productAvatars/${product.img}.png`} alt={product.name} />
                <div className="product-description">
                  <h1>{product.name}</h1>
                  <p className="product-code">{`Product code ${product.code}`}</p>
                </div>
              </figure>
            </div>
            <div className="col-quantity">
              <button
                className="count"
                onClick={() => updateCart(product.id, --cart[product.id].quantity)}
              >-</button>
              <input
                type="text"
                className="product-quantity"
                value={cart[product.id].quantity}
                onChange={(e) => updateCart(product.id, e.target.value)}
              />
              <button
                className="count"
                onClick={() => updateCart(product.id, ++cart[product.id].quantity)}
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
)

export default ProductList
