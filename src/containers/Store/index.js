import React, {useMemo, useState} from 'react'
import ProductList from '../../components/ProductList'
import Summary from '../../components/Summary'
import ItemDetail from '../../components/ItemDetail'

const Store = ({
  products,
  cart,
  cartDiscounts,
  updateCart,
  totalPrice,
  total,
}) => {

  const [itemSelected, setItemSelected] = useState(null)

  // True if have discounts, false if not
  const withDiscounts = useMemo(() => (
    cartDiscounts.filter(discount => discount.totalDiscounted && discount.totalDiscounted > 0).length > 0
  ),[cartDiscounts])

  // Number of cart items
  const nCartItems = useMemo(() => {
    let numberOfItems = 0
    Object.entries(cart).forEach(([key, value]) => numberOfItems += value.quantity)
    return numberOfItems
  },[cart])

  // Render Store
  const renderCheckout = useMemo(() => (
    <React.Fragment>
      <ProductList
        products={products}
        cart={cart}
        updateCart={updateCart}
        setItemSelected={setItemSelected}
      />
      <Summary
        nCartItems={nCartItems}
        totalPrice={totalPrice}
        withDiscounts={withDiscounts}
        cartDiscounts={cartDiscounts}
        total={total}
      />
    </React.Fragment>
  ),[cart, cartDiscounts, nCartItems, products, total, totalPrice, updateCart, withDiscounts])

  const renderItemDetail = useMemo(() => (
    <ItemDetail
      item={itemSelected}
      setItem={setItemSelected}
    />
  ),[itemSelected])

  return itemSelected ? renderItemDetail : renderCheckout
}

export default Store
