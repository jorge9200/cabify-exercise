export const products = [
  {id: 'TSHIRT', img: 'tshirt', name: 'Shirt', code: 'X7R2OPX', price: 20},
  {id: 'MUG', img: 'mug', name: 'Mug', code: 'X2G2OPZ', price: 5},
  {id: 'CAP', img: 'cap', name: 'Cap', code: 'X3W2OPY', price: 10}
]

export const discounts = [
  { id: 'MUG2X1',
    name: '2x1 Mug offer',
    condition: (cart) => cart.MUG.quantity >= 2,
    formula: (cart) => Math.floor(cart.MUG.quantity/2) * cart.MUG.price
  },
  { id: 'X3SHIRTS',
    name: 'x3 Shirt offer',
    condition: (cart) => cart.TSHIRT.quantity >= 3,
    formula: (cart) => cart.TSHIRT.totalPrice * 5 / 100
  }
]
