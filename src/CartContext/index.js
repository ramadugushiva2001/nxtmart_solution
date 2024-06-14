import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  removeCartItem: () => {},
  removeAllCartItems: () => {},
})

export default CartContext
