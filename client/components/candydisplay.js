import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addCandyToCart} from '../store/cart'
import {removeCandyThunk} from '../store/candy'

const CandyDisplay = props => {
  const {id, name, description, price, image, quantity} = props.candy

  function handleClick() {
    let userId = props.user.id
    let candyObj = {
      quantity: 1,
      candyId: id
    }
    props.addCandyToCart(userId, candyObj)
  }

  const {removeCandy} = props

  return (
    <>
      <div key={id} className="candyContainer">
        <Link to={`/candy/${id}`}>
          <img src={image} />
        </Link>
        <div className="candyInfo">
          <div>
            <Link to={`/candy/${id}`}>
              <h2>{name}</h2>
            </Link>
            <hr />
          </div>
          {description}
          <hr />
          Price: ${price / 100}
          <hr />
          In Stock: {quantity}
        </div>
        <div className="candyButtons">
          <div className="buyButton" onClick={handleClick}>
            Buy Here!
          </div>
          {props.user.admin && (
            <>
              <div
                className="singleCandyCartRemove"
                onClick={() => removeCandy(id)}
              >
                Remove
              </div>
              <div
                className="singleCandyCartRemove"
                onClick={() => props.history.push(`/candy/${id}`)}
              >
                Edit
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  addCandyToCart: (userId, candyObj) =>
    dispatch(addCandyToCart(userId, candyObj)),
  removeCandy: id => dispatch(removeCandyThunk(id))
})

export default withRouter(connect(mapState, mapDispatch)(CandyDisplay))
