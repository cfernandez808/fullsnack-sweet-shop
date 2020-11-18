import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {removeCart, updateQuantity, getCart} from '../store/cart'
import {me} from '../store/user'
import {getCandyThunk} from '../store/candy'

class SingleCandyCart extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0,
      difference: 0,
      inStock: 0,
    }
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.setState({quantity: this.props.candy.quantity})
    this.props.getUser()
    this.props.loadCandy()
  }

  increment(inStock) {
    if (this.state.difference < inStock) {
      this.setState((prevState) => ({
        quantity: prevState.quantity + 1,
        difference: prevState.difference + 1,
      }))
    }
  }

  decrement() {
    if (this.state.quantity > 1) {
      this.setState((prevState) => ({
        quantity: prevState.quantity - 1,
        difference: prevState.difference - 1,
      }))
    }
  }

  handleClick(cartId, candyId) {
    const updatedCart = {quantity: this.state.quantity}
    this.props.updateQuantity(
      cartId,
      updatedCart,
      candyId,
      this.state.difference
    )
    this.setState((prevState) => ({...prevState, difference: 0}))
  }

  render() {
    const {id, name, price, image, candyId} = this.props.candy
    let inStock
    if (this.props.candyArr.filter((candy) => candy.id === candyId).length) {
      inStock = this.props.candyArr.filter((candy) => candy.id === candyId)[0]
        .quantity
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
                onClick={() => this.increment(inStock)}
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
                  if (this.props.user.id) this.handleClick(id, candyId)
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
  candyArr: state.candy,
})

const mapDispatch = (dispatch) => {
  return {
    deleteCandy: (cartId) => dispatch(removeCart(cartId)),
    updateQuantity: (cartId, quantity, candyId, difference) =>
      dispatch(updateQuantity(cartId, quantity, candyId, difference)),
    getUser: () => dispatch(me()),
    notLoggedIn: (cart) => dispatch(getCart(cart)),
    loadCandy: () => dispatch(getCandyThunk()),
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleCandyCart))
