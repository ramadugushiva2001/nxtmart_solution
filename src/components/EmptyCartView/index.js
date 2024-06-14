import {withRouter} from 'react-router-dom'
import './index.css'

const EmptyCartView = props => {
  const onClickShopNow = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="empty-cart-view">
      <img
        src="https://res.cloudinary.com/dmmpu2exc/image/upload/v1712727711/cartLogo_u04uzz.png"
        alt="empty cart"
        className="cart-img"
      />
      <p>Your cart is empty</p>
      <button
        className="shop-now-button"
        type="button"
        onClick={onClickShopNow}
      >
        Shop Now
      </button>
    </div>
  )
}

export default withRouter(EmptyCartView)
