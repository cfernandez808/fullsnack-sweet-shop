import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk, checkoutThunk, getCart} from '../store/cart'
import {withRouter} from 'react-router-dom'
import {SingleCandyCart} from './'
import {me} from '../store/user'

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
                if (user.id) {
                  await checkout(cart)
                } else {
                  localStorage.setItem('cart', JSON.stringify([]))
                }
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
  notLoggedIn: (cart) => dispatch(getCart(cart)),
})

export default withRouter(connect(mapState, mapDispatch)(CartDisplay))
