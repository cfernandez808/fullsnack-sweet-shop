import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {removeUserThunk} from '../store/adminUsers'

const UserDisplay = (props) => {
  const {
    firstName,
    lastName,
    email,
    admin,
    shippingAddress,
    billingAddress,
    id,
  } = props.user

  const {removeUser} = props

  return (
    <>
      <div key={id} className="userContainer">
        <div className="candyInfo">
          <div>
            <h2>{firstName + ' ' + lastName}</h2>
            <hr />
          </div>
          {email}
          <hr />
          Admin: {admin ? 'TRUE' : 'FALSE'}
          <hr />
          Shipping Address: {shippingAddress}
          <hr />
          billingAddress: {billingAddress}
          <hr />
          <div className="singleCandyCartRemove" onClick={() => removeUser(id)}>
            Remove
          </div>
        </div>
      </div>
    </>
  )
}

const mapDispatch = (dispatch) => ({
  removeUser: (id) => dispatch(removeUserThunk(id)),
})

export default withRouter(connect(null, mapDispatch)(UserDisplay))
