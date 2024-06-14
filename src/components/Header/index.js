import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

import {TbLogout2} from 'react-icons/tb'

const Header = props => {
  const onClickLogOut = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <nav className="header-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dmmpu2exc/image/upload/v1712556158/nxtlogo_xqvupr.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul className="nav-items-list">
          <Link className="link-item" to="/">
            <li className="nav-list-item">Home</li>
          </Link>
          <Link className="link-item" to="/cart">
            <li className="nav-list-item">Cart</li>
          </Link>
          <li className="nav-list-item">
            <TbLogout2 size={20} />
            <button
              type="button"
              className="nav-logout-button"
              onClick={onClickLogOut}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default withRouter(Header)

/**
          <li className="nav-list-item">
            <Link className="link-item" to="/cart">
              <button className="nav-logout-button">Cart</button>
            </Link>
          </li>
 

 */
