import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {removeCart, updateQuantity} from '../store/cart'

class SingleCandyCart extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0,
    }
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.setState({quantity: this.props.candy.quantity})
  }

  increment() {
    this.setState((prevState) => ({
      quantity: prevState.quantity + 1,
    }))
  }

  decrement() {
    this.setState((prevState) => ({
      quantity: prevState.quantity - 1,
    }))
  }

  handleClick(cartId, userId) {
    const updatedCart = {quantity: this.state.quantity}
    this.props.updateQuantity(cartId, updatedCart, userId)
  }

  render() {
    const {id, name, price, image} = this.props.candy

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
              onClick={() => this.decrement()}
            >
              -
            </div>
            <div className="singleCandyCartQuantity">
              Quantity
              <br />
              {this.state.quantity}
            </div>
            <div
              className="singleCandyPlusButton"
              onClick={() => this.increment()}
            >
              +
            </div>
          </div>
          <div className="singleCandyCartButtons">
            <div
              className="singleCandyCartUpdate"
              onClick={() => this.handleClick(id, this.props.user.id)}
            >
              Update
            </div>
            <div
              className="singleCandyCartRemove"
              onClick={() => this.props.deleteCandy(id, this.props.user.id)}
            >
              Remove
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    deleteCandy: (cartId, userId) => dispatch(removeCart(cartId, userId)),
    updateQuantity: (cartId, quantity, userId) =>
      dispatch(updateQuantity(cartId, quantity, userId)),
  }
}

export default withRouter(connect(null, mapDispatch)(SingleCandyCart))
