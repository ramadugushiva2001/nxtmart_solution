import {Component} from 'react'
import {TiTick} from 'react-icons/ti'

import CartContext from '../../CartContext'

import EmptyCartView from '../EmptyCartView'
import CartItem from '../CartItem'
import Footer from '../Footer'
import Header from '../Header'
import MobileNavbar from '../MobileNavbar'

import './index.css'

class Cart extends Component {
  state = {isCheckedOut: false}

  onClickCheckout = () => {
    this.setState({isCheckedOut: true})
    localStorage.clear()
  }

  onClickReturnHomePage = () => {
    const {history} = this.props
    this.setState({isCheckedOut: false})
    history.push('/')
  }

  checkoutPage = () => (
    <div className="checkout-view">
      <div className="tick-mark">
        <TiTick size={35} color="#088c03" />
      </div>
      <h1>Payment Successful</h1>
      <p>Thank you for ordering. Your payment is successfully completed.</p>
      <button
        type="button"
        className="checkout-button"
        onClick={this.onClickReturnHomePage}
      >
        Return To Homepage
      </button>
    </div>
  )

  cartListView = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0

        cartList.forEach(each => {
          total += parseInt(each.price.slice(1)) * each.quantity
        })

        return (
          <div className="cart-list-view" data-testid="cartItem">
            <h1>Items</h1>
            <ul className="cart-list">
              {cartList.map(each => (
                <CartItem cartItemsList={each} key={each.id} />
              ))}
            </ul>

            <div className="total-bill">
              <p data-testid="total-price">
                Total ({cartList.length} items) : ₹ <span>{total}</span>
              </p>
              <button
                type="button"
                className="checkout-button"
                onClick={this.onClickCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    const {isCheckedOut} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const isCartEmpty = cartList.length === 0
          let viewComponent

          if (isCartEmpty) {
            viewComponent = <EmptyCartView />
          } else if (isCheckedOut) {
            viewComponent = this.checkoutPage()
          } else {
            viewComponent = this.cartListView()
          }
          return (
            <div className="cart-container" data-testid="cartItem">
              <Header />
              {viewComponent}
              <Footer />
              <MobileNavbar />
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart

/*
{
  isCartEmpty ? (
    <EmptyCartView />
  ) : isCheckedOut ? (
    this.checkoutPage()
  ) : (
    this.cartListView()
  )
}
*/
