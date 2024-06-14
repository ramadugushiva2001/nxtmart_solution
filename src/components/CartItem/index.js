import CartContext from '../../CartContext'

import './index.css'

const CartItem = props => {
  const {cartItemsList} = props
  // console.log(cartItemsList)
  const {id, name, image, price, weight, quantity} = cartItemsList

  const totalPrice = parseInt(price.slice(1)) * quantity

  return (
    <CartContext.Consumer>
      {value => {
        const {increaseQuantity, decreaseQuantity} = value

        const onclickDecrease = () => {
          decreaseQuantity(id)
        }

        const onclickIncrease = () => {
          increaseQuantity(id)
        }

        return (
          <>
            <li className="cart-list-item">
              <div className="cart-image-container">
                <img src={image} alt={name} className="cart-item-image" />
                <div className="cart-description">
                  <p className="description">{name}</p>
                  <p className="description">{weight}</p>
                  <p className="description">{price}</p>
                </div>
              </div>
              <div className="cart-quantity">
                <p data-testid="total-price">{totalPrice}</p>
                <>
                  <button
                    type="button"
                    className="cart-button"
                    data-testid="decrement-quantity"
                    onClick={onclickDecrease}
                  >
                    -
                  </button>
                  <p data-testid="item-quantity">{quantity}</p>
                  <button
                    className="cart-button"
                    data-testid="increment-quantity"
                    onClick={onclickIncrease}
                    type="button"
                  >
                    +
                  </button>
                </>
              </div>
            </li>
            <hr className="horizontal-line" />
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
