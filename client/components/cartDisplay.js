import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/cart'
import {withRouter} from 'react-router-dom'
import {SingleCandyCart} from './'
import {me} from '../store/user'

export class CartDisplay extends React.Component {
  async componentDidMount() {
    await this.props.getUser()
    await this.props.getCart(this.props.user.id)
  }
  render() {
    const {cart, user} = this.props
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
    return (
      <div>
        <div className="totalDisplay">
          <div className="total">Cart Total: ${totalPrice}</div>
          <div className="proceedToCheckout">Proceed To Checkout</div>
        </div>
        <div className="allProductsContainer">
          {cart.length > 0 ? (
            <>
              {cart.map(candy => (
                <SingleCandyCart key={candy.id} candy={candy} />
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
                border: '2px solid white'
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

const mapState = state => ({
  cart: state.cart,
  user: state.user
})

const mapDispatch = dispatch => ({
  getCart: id => dispatch(getCartThunk(id)),
  getUser: () => dispatch(me())
})

export default withRouter(connect(mapState, mapDispatch)(CartDisplay))
