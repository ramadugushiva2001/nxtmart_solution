import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {CgProfile} from 'react-icons/cg'
import {MdOutlineLockReset} from 'react-icons/md'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showError: false,
    errorMsg: '',
  }

  onShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onClickLogin = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="label-text">
          Username
        </label>
        <div className="username-input-container">
          <CgProfile size={45} className="react-icon" />
          <input
            id="username"
            className="username"
            type="text"
            value={username}
            onChange={this.onChangeUsername}
          />
        </div>
      </>
    )
  }

  renderPassword = () => {
    const {password, showPassword} = this.state
    return (
      <>
        <label htmlFor="password" className="label-text">
          Password
        </label>
        <div className="password-input-container">
          <MdOutlineLockReset size={45} className="react-icon" />
          <input
            id="password"
            className="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={this.onChangePassword}
          />
        </div>
      </>
    )
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {showPassword, errorMsg, showError} = this.state
    console.log(showPassword)

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form onSubmit={this.onClickLogin} className="form-container">
          <img
            src="https://res.cloudinary.com/dmmpu2exc/image/upload/v1712556158/nxtlogo_xqvupr.png"
            alt="login website logo"
            className="website-logo"
          />
          {this.renderUsername()}
          {this.renderPassword()}
          <div>
            <input
              id="checkbox"
              onChange={this.onShowPassword}
              type="checkbox"
            />
            <label htmlFor="checkbox">Show Password</label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showError && <p>{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
