import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    userName: '',
    Pin: '',
    showError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 10,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({errorMsg: error, showError: true})
  }

  onLogin = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/ebank/login'
    const {userName, Pin} = this.state
    const userDetails = {user_id: userName, pin: Pin}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const jsonData = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(jsonData.jwt_token)
    } else {
      this.onSubmitFailure(jsonData.error_msg)
    }
  }

  onUsername = event => {
    this.setState({userName: event.target.value})
  }

  onPin = event => {
    this.setState({Pin: event.target.value})
  }

  render() {
    const {userName, Pin, showError, errorMsg} = this.state
    return (
      <div className="login_bg">
        <div className="sub_con">
          <div className="image_con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="web"
            />
          </div>

          <div className="form_con">
            <form className="form" onSubmit={this.onLogin}>
              <h1 className="login_h1">Welcome Back!</h1>

              <div className="input_con">
                <label className="label" htmlFor="user">
                  User ID
                </label>

                <input
                  type="text"
                  className="input"
                  placeholder="Enter User ID"
                  id="user"
                  value={userName}
                  onChange={this.onUsername}
                />
              </div>

              <div className="input_con">
                <label className="label" htmlFor="pin">
                  PIN
                </label>

                <input
                  type="password"
                  className="input"
                  placeholder="Enter User ID"
                  id="pin"
                  value={Pin}
                  onChange={this.onPin}
                />
              </div>

              <button type="submit" className="btn">
                Login
              </button>

              {showError && <p className="error">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
