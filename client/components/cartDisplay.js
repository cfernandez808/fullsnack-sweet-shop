import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk, checkoutThunk} from '../store/cart'
import {withRouter} from 'react-router-dom'
import {SingleCandyCart} from './'
import {me} from '../store/user'

export class CartDisplay extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: {},
      reducedCart: [],
    }
    this.cartReducer = this.cartReducer.bind(this)
    this.quantityFinder = this.quantityFinder.bind(this)
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  async componentDidMount() {
    await this.props.getUser()
    await this.props.getCart(this.props.user.id)
    this.cartReducer()
    this.quantityFinder()
  }

  cartReducer() {
    let {cart} = this.props
    if (cart.length > 0) {
      cart = cart.filter((item) => !item.completed)
    }
    const streamlinedCart = []
    const idTracker = []
    for (let i = 0; i < cart.length; i++) {
      let currentCandy = cart[i]
      if (!idTracker.includes(currentCandy.cart_candy.candyId)) {
        streamlinedCart.push(currentCandy)
        idTracker.push(currentCandy.cart_candy.candyId)
      }
    }
    this.setState({reducedCart: streamlinedCart})
  }

  quantityFinder() {
    let {cart} = this.props
    if (cart.length > 0) {
      cart = cart.filter((item) => !item.completed)
    }
    const quantities = {}
    cart.forEach((element) => {
      if (quantities[element.cart_candy.candyId]) {
        quantities[element.cart_candy.candyId] =
          quantities[element.cart_candy.candyId] + element.quantity
      } else {
        quantities[element.cart_candy.candyId] = element.quantity
      }
    })
    this.setState({quantity: quantities})
  }

  increment(candyId) {
    this.setState((prevState) => ({
      quantity: {
        ...prevState.quantity,
        [candyId]: prevState.quantity[candyId] + 1,
      },
    }))
  }

  decrement(candyId) {
    if (this.state.quantity[candyId] > 0) {
      this.setState((prevState) => ({
        quantity: {
          ...prevState.quantity,
          [candyId]: prevState.quantity[candyId] - 1,
        },
      }))
    }
  }

  render() {
    const {user, checkout} = this.props
    let {cart} = this.props

    if (cart.length > 0) {
      cart = cart.filter((item) => !item.completed)
    }

    let totalPrice
    if (cart.length > 0) {
      console.log('CART IN TOTAL', cart)
      totalPrice = cart
        .reduce((total, singleCandy) => {
          total += singleCandy.quantity * +singleCandy.price
          return total
        }, 0)
        .toFixed(2)
    }

    if (!user.id) return <div>Log in to view cart.</div>
    console.log('REDUCED CART', this.state.reducedCart)
    return (
      <div>
        <div className="totalDisplay">
          <div className="total">
            Cart Total: ${cart.length > 0 ? String(totalPrice / 100) : '0'}
          </div>
          {cart.length > 0 ? (
            <div
              className="proceedToCheckout"
              onClick={async () => {
                await checkout(cart)
                this.props.history.push('/confirmation')
              }}
            >
              Proceed To Checkout
            </div>
          ) : (
            <div
              className="proceedToCheckout"
              style={{background: 'gray', cursor: 'default'}}
            >
              Cart Empty
            </div>
          )}
        </div>
        <div className="allProductsContainer">
          {cart.length > 0 ? (
            <>
              {this.state.reducedCart.map((candy) => (
                <SingleCandyCart
                  key={candy.id}
                  candy={candy}
                  quantity={this.state.quantity[candy.cart_candy.candyId]}
                  increment={this.increment}
                  decrement={this.decrement}
                  user={user}
                  // handleUpdate={this.handleUpdate}
                />
              ))}
            </>
          ) : (
            <div
              style={{
                background: 'rgba(0,0,0,0.6)',
                fontSize: '30px',
                color: 'white',
                padding: '20px',
                marginTop: '100px',
                borderRadius: '40px',
                border: '2px solid white',
              }}
            >
              View Selection on Home Page!
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  cart: state.cart,
  user: state.user,
})

const mapDispatch = (dispatch) => ({
  getCart: (id) => dispatch(getCartThunk(id)),
  getUser: () => dispatch(me()),
  checkout: (cart) => dispatch(checkoutThunk(cart)),
})

export default withRouter(connect(mapState, mapDispatch)(CartDisplay))
