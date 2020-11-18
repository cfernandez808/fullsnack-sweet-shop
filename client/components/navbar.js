import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, admin, userId, history}) => (
  <div className="navbar">
    <nav>
      <div className="title">
        <h1>FullSnack Sweet Shop</h1>
      </div>
      {isLoggedIn ? (
        <div className="navInfo">
          <div className="buttonsLeft">
            <div className="homeButton" onClick={() => history.push('/home')}>
              <Link to="/home">Home</Link>
            </div>
            <div
              className="orderHistoryButton"
              onClick={() => history.push(`/editUser/${userId}`)}
            >
              <Link to={`/editUser/${userId}`}>Edit Profile</Link>
            </div>
            {admin && (
              <div className="buttonNav" onClick={() => history.push('/admin')}>
                <Link to="/admin">Admin</Link>
              </div>
            )}
          </div>
          <div className="buttonsRight">
            <div className="buttonNav" onClick={handleClick}>
              <a href="#">Logout</a>
            </div>
            <div
              className="orderHistoryButton"
              onClick={() => history.push(`/history/${userId}`)}
            >
              <Link to={`/history/${userId}`}>Order History</Link>
            </div>
            <div className="cartButton" onClick={() => history.push('/cart')}>
              <Link to="/cart">Cart</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="navInfo">
          <div className="buttonLeft">
            <div className="homeButton" onClick={() => history.push('/home')}>
              <Link to="/">Home</Link>
            </div>
            <div
              className="signUpButton"
              onClick={() => history.push('/signup')}
            >
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
          <div className="buttonsRight">
            <div className="buttonNav" onClick={() => history.push('/login')}>
              <Link to="/login">Login</Link>
            </div>
            <div className="cartButton" onClick={() => history.push('/cart')}>
              <Link to="/cart">Cart</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    admin: state.user.admin,
    userId: state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
