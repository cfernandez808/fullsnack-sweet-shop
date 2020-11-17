import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {removeCart, updateQuantity, getCart} from '../store/cart'
import {me} from '../store/user'

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
    this.props.getUser()
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

  handleClick(cartId) {
    const updatedCart = {quantity: this.state.quantity}
    this.props.updateQuantity(cartId, updatedCart)
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
            {this.props.location.pathname.split('/')[1] !== 'history' && (
              <div
                className="singleCandyMinusButton"
                onClick={() => this.decrement()}
              >
                -
              </div>
            )}
            <div className="singleCandyCartQuantity">
              Quantity
              <br />
              {this.props.location.pathname.split('/')[1] !== 'history'
                ? this.state.quantity
                : this.props.quantity}
            </div>
            {this.props.location.pathname.split('/')[1] !== 'history' && (
              <div
                className="singleCandyPlusButton"
                onClick={() => this.increment()}
              >
                +
              </div>
            )}
          </div>
          {this.props.location.pathname.split('/')[1] !== 'history' && (
            <div className="singleCandyCartButtons">
              <div
                className="singleCandyCartUpdate"
                onClick={() => {
                  if (this.props.user.id) this.handleClick(id)
                  else {
                    let newCart = JSON.parse(localStorage.getItem('cart')).map(
                      (candy) => {
                        if (candy.id === id) {
                          candy.quantity = this.state.quantity
                          return candy
                        } else return candy
                      }
                    )
                    localStorage.setItem('cart', JSON.stringify(newCart))
                    this.props.notLoggedIn(
                      JSON.parse(localStorage.getItem('cart'))
                    )
                  }
                }}
              >
                Update
              </div>
              <div
                className="singleCandyCartRemove"
                onClick={() => {
                  if (this.props.user.id) this.props.deleteCandy(id)
                  else {
                    let newCart = JSON.parse(
                      localStorage.getItem('cart')
                    ).filter((x) => x.id !== id)
                    localStorage.setItem('cart', JSON.stringify(newCart))
                    this.props.notLoggedIn(
                      JSON.parse(localStorage.getItem('cart'))
                    )
                  }
                }}
              >
                Remove
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user,
})

const mapDispatch = (dispatch) => {
  return {
    deleteCandy: (cartId) => dispatch(removeCart(cartId)),
    updateQuantity: (cartId, quantity) =>
      dispatch(updateQuantity(cartId, quantity)),
    getUser: () => dispatch(me()),
    notLoggedIn: (cart) => dispatch(getCart(cart)),
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleCandyCart))
