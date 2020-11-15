import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, admin, history}) => (
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
            <div className="buttonNav" onClick={() => history.push('/home')}>
              <Link to="/home">Home</Link>
            </div>
            {admin && (
              <div className="buttonNav" onClick={() => history.push('/admin')}>
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
            <div className="buttonNav" onClick={handleClick}>
              <a href="#">Logout</a>
            </div>
            <div className="buttonNav" onClick={() => history.push('/cart')}>
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
            <div className="buttonNav" onClick={() => history.push('/home')}>
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
              <Link to="/login" onClick={() => history.push('/login')}>
                Login
              </Link>
            </div>
            <div className="buttonNav" onClick={() => history.push('/cart')}>
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
