import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {removeCart, updateQuantity} from '../store/cart'

const SingleCandyCart = (props) => {
  const {id, name, price, image} = props.candy
  const {quantity, increment, decrement, history} = props
  const {candyId} = props.candy.cart_candy

  function handleClick(cartId, newQuantity) {
    const updatedCart = {quantity: newQuantity}
    props.updateQuantity(cartId, updatedCart)
  }

  return (
    <div className="singleCandyCart">
      <div className="imageDiv">
        <img src={image} />
      </div>
      <div className="candyRight">
        <div>
          <h2>{name}</h2>
          <hr />
        </div>
        <div>
          <small>Price: ${price / 100}</small>
        </div>
        <div className="singleCandyCartQuantityButtons">
          <div
            className="singleCandyMinusButton"
            onClick={() => decrement(candyId)}
          >
            -
          </div>
          <div className="singleCandyCartQuantity">
            Quantity
            <br />
            {quantity}
          </div>
          <div
            className="singleCandyPlusButton"
            onClick={() => increment(candyId)}
          >
            +
          </div>
          <div>
            {history ? (
              ''
            ) : (
              <div
                className="singleCandyCartRemove"
                onClick={() => props.deleteCandy(id)}
              >
                Remove
              </div>
            )}
          </div>
        </div>
        <div className="singleCandyCartButtons">
          <div
            className="singleCandyCartUpdate"
            onClick={() => handleClick(id, quantity)}
          >
            Update
          </div>
          <div
            className="singleCandyCartRemove"
            onClick={() => props.deleteCandy(id)}
          >
            Remove
          </div>
        </div>
      </div>
    </div>
  )
}
const mapDispatch = (dispatch) => {
  return {
    deleteCandy: (cartId) => dispatch(removeCart(cartId)),
    updateQuantity: (cartId, quantity) =>
      dispatch(updateQuantity(cartId, quantity)),
  }
}

export default withRouter(connect(null, mapDispatch)(SingleCandyCart))
