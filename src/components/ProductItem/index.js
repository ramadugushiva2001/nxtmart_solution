import {Component} from 'react'

import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import CartContext from '../../CartContext'
import './index.css'

class ProductItem extends Component {
  state = {quantity: 1}

  render() {
    const {quantity} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {
            addToCart,
            cartList,
            decreaseQuantity,
            increaseQuantity,
            removeCartItem,
          } = value

          const {products} = this.props

          const isPresent = cartList.find(each => each.id === products.id)

          const onClickAddToCart = () => {
            addToCart({...products, quantity})
          }

          const onClickDecrementQuantity = () => {
            if (quantity > 1) {
              this.setState(prevState => ({quantity: prevState.quantity - 1}))
              decreaseQuantity(products.id)
            } else if (quantity === 1) {
              removeCartItem(products.id)
            }
          }

          const onIncrementQuantity = () => {
            increaseQuantity(products.id)
            this.setState(prevState => ({quantity: prevState.quantity + 1}))
          }

          return (
            <div className="product-item" data-testid="product">
              <img
                src={products.image}
                className="product-image"
                alt={products.name}
              />
              <p>{products.name}</p>
              <div className="product-details">
                <div>
                  <p>{products.weight}</p>
                  <p>{products.price}</p>
                </div>
                {isPresent ? (
                  <div className="products-quantity">
                    <button
                      type="button"
                      className="decrement-button"
                      data-testid="decrement-count"
                      onClick={onClickDecrementQuantity}
                      aria-label="Decrement Quantity"
                    >
                      <AiOutlineMinus />
                    </button>
                    <p className="quantity" data-testid="active-count">
                      {isPresent.quantity}
                    </p>
                    <button
                      type="button"
                      className="increment-button"
                      data-testid="increment-count"
                      onClick={onIncrementQuantity}
                      aria-label="Increment Quantity"
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                ) : (
                  <button
                    className="add-to-cart-button"
                    type="button"
                    data-testid="add-button"
                    onClick={onClickAddToCart}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default ProductItem
