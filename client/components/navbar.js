import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, admin, userId}) => (
  <div className="navbar">
    <nav>
      <div className="title">
        <h1>FullSnack Sweet Shop</h1>
      </div>
      {isLoggedIn ? (
        <div className="navInfo">
          {/* The navbar will show these links after you log in */}
          <div
            style={{width: '50%', display: 'flex', justifyContent: 'center'}}
          >
            <div className="buttonNav">
              <Link to="/home">Home</Link>
            </div>
            <div className="buttonNav">
              <Link to={`/history/${userId}`}>My Order History</Link>
            </div>
            {admin && (
              <div className="buttonNav">
                <Link to="/admin">Admin</Link>
              </div>
            )}
          </div>
          {/* <div
            style={{width: '30%', display: 'flex', justifyContent: 'center'}}
          /> */}
          <div
            style={{width: '50%', display: 'flex', justifyContent: 'center'}}
          >
            <div className="buttonNav">
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
            <div className="buttonNav">
              <Link to="/cart">Cart</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="navInfo">
          {/* The navbar will show these links before you log in */}
          <div
            style={{width: '35%', display: 'flex', justifyContent: 'center'}}
          >
            <div className="buttonNav">
              <Link to="/">Home</Link>
            </div>
          </div>
          <div
            style={{width: '30%', display: 'flex', justifyContent: 'center'}}
          />
          <div
            className="buttonsRight"
            style={{width: '35%', display: 'flex', justifyContent: 'center'}}
          >
            <div className="buttonNav">
              <Link to="/login">Login</Link>
            </div>
            <div className="buttonNav">
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

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
