import React from 'react'
import {connect} from 'react-redux'
import {AllProducts} from './'
import user from '../store/user'
import {withRouter} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {firstName} = props.user

  return (
    <div>
      {firstName && (
        <div className="main">
          <div className="welcome">
            <h3>Welcome, {firstName}!</h3>
          </div>
        </div>
      )}
      <AllProducts />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
  }
}

export default withRouter(connect(mapState)(UserHome))
