import React from 'react'

const Summary = ({
  nCartItems,
  totalPrice,
  withDiscounts,
  cartDiscounts,
  total
}) => (
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
)

export default Summary
