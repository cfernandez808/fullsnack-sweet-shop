import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk, checkoutThunk, getCart} from '../store/cart'
import {withRouter} from 'react-router-dom'
import {SingleCandyCart} from './'
import {me} from '../store/user'
import {loadStripe} from '@stripe/stripe-js'
const stripePromise = loadStripe(
  'pk_test_51HnybfFEiVZX0xQop0LgXy01heoTBVBfZndolDlWejdSYPeeg63R32DXL5FGH7bySutRAGmgrt2iGYEddeVHTKl700BxpaUe3v'
)

export class CartDisplay extends React.Component {
  async componentDidMount() {
    await this.props.getUser()
    if (this.props.user.id) {
      await this.props.getCart(this.props.user.id)
    }
  }

  // eslint-disable-next-line complexity
  render() {
    const {user, checkout} = this.props
    let {cart} = this.props

    if (cart.length > 0) {
      cart = cart.filter((item) => !item.completed)
      cart.sort((x, y) => x.id - y.id)
    }

    if (!user.id) {
      cart = JSON.parse(localStorage.getItem('cart')) || []
      if (cart.length > 1) {
        cart.sort((x, y) => x.id - y.id)
      }
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
    let curr = 'usd'
    return (
      <div>
        <div className="couponLang">
          <button
            className="couponLangbtn"
            type="button"
            onClick={() => {
              curr = 'usd'
            }}
          >
            USA
          </button>
          <button
            className="couponLangbtn"
            type="button"
            onClick={() => {
              curr = 'jpy'
            }}
          >
            JAPAN
          </button>
          <button
            className="couponLangbtn"
            type="button"
            onClick={() => {
              curr = 'aud'
            }}
          >
            AUSTRALIA
          </button>
        </div>
        <div className="totalDisplay">
          <div className="total">
            Cart Total: ${cart.length > 0 ? String(totalPrice / 100) : '0'}
          </div>
          {cart.length > 0 ? (
            <div
              className="proceedToCheckout"
              onClick={async () => {
                const stripe = await stripePromise
                if (user.id) {
                  await checkout(cart)
                } else {
                  localStorage.setItem('cart', JSON.stringify([]))
                }
                fetch('/create-checkout-session', {
                  method: 'POST',
                  headers: {
                    'Content-type': 'application/json',
                  },
                  body: JSON.stringify({
                    cart: cart,
                    currency: curr,
                  }),
                })
                  .then((response) => response.json())
                  .then(async (session) => {
                    const result = await stripe.redirectToCheckout({
                      sessionId: session.id,
                    })
                  })
                  .catch((error) => {
                    console.error('Error', error)
                  })
              }}
            >
              Proceed To Checkout
            </div>
          ) : (
            <div className="proceedToCheckoutBlocked">Cart Empty</div>
          )}
        </div>
        <div className="allProductsContainer">
          {cart.length > 0 ? (
            <>
              {cart.map((candy) => (
                <SingleCandyCart
                  key={candy.id}
                  candy={candy}
                  quantity={candy.quantity}
                  user={user}
                  getCart={this.props.getCart}
                />
              ))}
            </>
          ) : (
            <div className="viewOnHome">View Selection on Home Page!</div>
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
  notLoggedIn: (cart) => dispatch(getCart(cart)),
})

export default withRouter(connect(mapState, mapDispatch)(CartDisplay))
