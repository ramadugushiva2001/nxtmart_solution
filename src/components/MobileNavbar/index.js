import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {LuHome} from 'react-icons/lu'
import {CiShoppingCart} from 'react-icons/ci'
import {TbLogout2} from 'react-icons/tb'

import './index.css'

const MobileNavbar = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="mobile-nav-container">
      <ul className="mobile-nav-items-list">
        <Link to="/">
          <li className="mobile-nav-item">
            <LuHome size={25} />
            Home
          </li>
        </Link>
        <Link to="/cart">
          <li className="mobile-nav-item">
            <CiShoppingCart size={20} />
            Cart
          </li>
        </Link>
        <li className="mobile-nav-item">
          <TbLogout2 size={20} />
          <button
            className="logout-button"
            type="button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(MobileNavbar)
