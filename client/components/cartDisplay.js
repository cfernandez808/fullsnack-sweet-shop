import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk, checkoutThunk} from '../store/cart'
import {withRouter, Link} from 'react-router-dom'
import {SingleCandyCart} from './'
import {me} from '../store/user'

export class CartDisplay extends React.Component {
  constructor() {
    super()
    this.cartReducer = this.cartReducer.bind(this)
    this.quantityFinder = this.quantityFinder.bind(this)
  }
  async componentDidMount() {
    await this.props.getUser()
    await this.props.getCart(this.props.user.id)
  }

  cartReducer() {
    let {cart} = this.props
    if (cart.length > 0) {
      cart = cart.filter((item) => !item.completed)
    }
    const reducedCart = []
    const idTracker = []
    for (let i = 0; i < cart.length; i++) {
      let currentCandy = cart[i]
      if (!idTracker.includes(currentCandy.cart_candy.candyId)) {
        reducedCart.push(currentCandy)
        idTracker.push(currentCandy.cart_candy.candyId)
      }
    }
    return reducedCart
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
    return quantities
  }

  render() {
    const {user, checkout} = this.props
    let {cart} = this.props
    if (cart.length > 0) {
      cart = cart.filter((item) => !item.completed)
    }

    let reducedCart
    let quantities
    if (cart.length > 0) {
      reducedCart = this.cartReducer()
      quantities = this.quantityFinder()
    }

    let totalPrice
    if (cart.length > 0) {
      totalPrice = cart
        .reduce((total, singleCandy) => {
          total += singleCandy.quantity * +singleCandy.price
          return total
        }, 0)
        .toFixed(2)
    }

    if (!user.id) return <div>Log in to view cart.</div>
    console.log(cart)
    return (
      <div>
        <div className="totalDisplay">
          <div className="total">
            Cart Total: ${cart.length > 0 ? String(totalPrice / 100) : '0'}
          </div>
          <div
            className="proceedToCheckout"
            onClick={async () => {
              await checkout(cart)
              this.props.history.push('/confirmation')
            }}
          >
            Proceed To Checkout
          </div>
        </div>
        <div className="allProductsContainer">
          {cart.length > 0 ? (
            <>
              {reducedCart.map((candy) => (
                <SingleCandyCart
                  key={candy.id}
                  candy={candy}
                  quantity={quantities[candy.cart_candy.candyId]}
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
                borderRadius: '35px',
                border: '2px solid white',
              }}
            >
              Nothing in Cart!
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
