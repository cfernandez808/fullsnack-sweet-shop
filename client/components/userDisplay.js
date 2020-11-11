import React from 'react'
import {withRouter, Link} from 'react-router-dom'

const UserDisplay = props => {
  const {
    firstName,
    lastName,
    email,
    admin,
    shippingAddress,
    billingAddress,
    id
  } = props.user

  return (
    <>
      <div key={id} className="candyContainer">
        {/* <Link to={`/candy/${id}`}> */}
        {/* <img src={image} /> */}
        {/* </Link> */}
        <div className="candyInfo">
          <div>
            {/* <Link to={`/candy/${id}`}> */}
            <h2>{firstName + ' ' + lastName}</h2>
            {/* </Link> */}
            <hr />
          </div>
          {email}
          <hr />
          Admin: {admin ? 'TRUE' : 'FALSE'}
          <hr />
          Shipping Address: {shippingAddress}
          <hr />
          billingAddress: {billingAddress}
        </div>
        {/* <div className="candyButtons">
          <div
            className="buyButton"
            onClick={async () => {
              await axios.post(`/api/cart/${props.user.id}`, {
                quantity: 1,
                candyId: id
              })
            }}
          >
            Buy Here!
          </div>
        </div> */}
      </div>
    </>
  )
}

export default withRouter(UserDisplay)
