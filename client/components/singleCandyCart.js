import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {removeCart} from '../store/cart'

const SingleCandyCart = (props) => {
  const {id, name, description, price, image} = props.candy
  const {quantity} = props
  return (
    <div className="singleCandyCart">
      <div className="candyImage">
        <img src={image} />
      </div>
      <div className="candyRight">
        <div>
          <h2>{name}</h2>
          <hr />
        </div>
        <div>
          <small>Price: ${price / 100}</small>
          <br />
          <br />
          <small>Quantity: {quantity}</small>
        </div>
        <div className="singleCandyCartButtons">
          <div>
            <div
              className="singleCandyCartRemove"
              onClick={() => props.deleteCandy(id)}
            >
              Remove
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const mapDispatch = (dispatch) => {
  return {
    deleteCandy: (cartId) => dispatch(removeCart(cartId)),
  }
}

export default withRouter(connect(null, mapDispatch)(SingleCandyCart))
