import React from 'react'
import {connect} from 'react-redux'
import {getSingleCandyThunk} from '../store/singleCandy'
import {addCandyToCart, getCartThunk, getCart} from '../store/cart'
import {withRouter} from 'react-router-dom'
import {EditCandyForm, SingleCandyCart} from './'
import {me} from '../store/user'

export class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    this.props.getSingleCandy(this.props.match.params.candyId)
    await this.props.getUser()
    if (this.props.user.id) {
      this.props.getCart(this.props.user.id)
    }
  }

  handleClick(candy) {
    if (!this.props.user.id) {
      candy.quantity = this.state.quantity
      let currentCart
      if (JSON.parse(localStorage.getItem('cart')).length > 0) {
        currentCart = JSON.parse(localStorage.getItem('cart'))
      } else {
        localStorage.setItem('cart', JSON.stringify([candy]))
        this.props.notLoggedIn(JSON.parse(localStorage.getItem('cart')))
        return
      }
      let notFound = true
      for (let item of currentCart) {
        if (item.id === candy.id) {
          item.quantity = this.state.quantity
          notFound = false
        }
      }
      if (notFound) {
        candy.quantity = this.state.quantity
        currentCart.push(candy)
      }
      localStorage.setItem('cart', JSON.stringify(currentCart))
      this.props.notLoggedIn(JSON.parse(localStorage.getItem('cart')))
    } else {
      let candyObj = {
        quantity: this.state.quantity,
        candyId: this.props.singleCandy.id,
      }
      this.props.addCandyToCart(candyObj)
    }
  }

  // eslint-disable-next-line complexity
  render() {
    const {singleCandy, user} = this.props
    let {cart} = this.props
    if (!user.id) {
      cart = JSON.parse(localStorage.getItem('cart')) || []
      if (!cart.length) {
        localStorage.setItem('cart', JSON.stringify([]))
      }
      if (cart.length > 1) {
        cart.sort((x, y) =>
          x.name === singleCandy.name ? -1 : y.name === singleCandy.name ? 1 : 0
        )
      }
    }
    if (cart.length > 0) {
      cart.sort((x, y) =>
        x.name === singleCandy.name ? -1 : y.name === singleCandy.name ? 1 : 0
      )
    }
    return (
      <>
        <div className="main">
          <div className="singleCandyContainer">
            <div className="singleCandyImg">
              <img src={singleCandy.image} />
            </div>
            <div className="singleCandyRight">
              <div className="singleCandyTopInfo">
                <div>
                  <h1>{singleCandy.name}</h1>
                </div>

                <div>
                  <div
                    className="fb-share-button"
                    data-href={`https://fullsnack-sweet-shop.herokuapp.com/candy/${this.props.match.params.candyId}`}
                    data-layout="button_count"
                    data-size="large"
                  >
                    <a
                      target="_blank"
                      href={`https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Ffullsnack-sweet-shop.herokuapp.com%2Fcandy%2F${this.props.match.params.candyId}&amp;src=sdkpreparse`}
                      className="fb-xfbml-parse-ignore"
                    >
                      Share
                    </a>
                  </div>
                </div>
                <hr />
                <div>
                  <h3>Description:</h3>
                  <p>{singleCandy.description}</p>
                </div>
                <hr />
                <div>
                  <h4>Price:</h4>
                  <h4>{String(singleCandy.price / 100)}</h4>
                </div>
              </div>
              <div className="singleCandyButtons">
                <div
                  className="singleCandyMinusButton"
                  onClick={() =>
                    this.setState((prevState) => ({
                      quantity: prevState.quantity - 1,
                    }))
                  }
                >
                  -
                </div>
                <div>
                  Quantity
                  <br />
                  {this.state.quantity}
                </div>
                <div
                  className="singleCandyPlusButton"
                  onClick={() =>
                    this.setState((prevState) => ({
                      quantity: prevState.quantity + 1,
                    }))
                  }
                >
                  +
                </div>
                {cart.length &&
                cart
                  .filter((x) => x.name === singleCandy.name)
                  .filter((x) => !x.completed).length > 0 ? (
                  <div className="singleCandyAddToCartButtonBlocked">
                    Item in cart
                  </div>
                ) : (
                  <div
                    className="singleCandyAddToCartButton"
                    onClick={() => this.handleClick(singleCandy)}
                  >
                    Add to Cart
                  </div>
                )}
              </div>
            </div>
          </div>
          {user.admin &&
            singleCandy.id ===
              +this.props.location.pathname.split('/')[
                this.props.location.pathname.split('/').length - 1
              ] && (
              <div className="candyEditContainer">
                <EditCandyForm singleCandy={singleCandy} />
              </div>
            )}
          <div className="singleCandyCartLabel">Cart View:</div>
          <div className="singleCandyCartDisplay">
            {cart.length &&
            cart.filter((item) => !item.completed).length > 0 ? (
              cart
                .filter((item) => !item.completed)
                .map((candy) => (
                  <SingleCandyCart
                    key={candy.id}
                    candy={candy}
                    quantity={candy.quantity}
                    user={user}
                    getCart={this.props.getCart}
                  />
                ))
            ) : (
              <div className="emptySingleCandyCart">
                <div className="welcome">Cart Empty</div>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }
}

const mapState = (state) => ({
  singleCandy: state.singleCandy,
  user: state.user,
  cart: state.cart,
})

const mapDispatch = (dispatch) => ({
  getSingleCandy: (id) => dispatch(getSingleCandyThunk(id)),
  getUser: () => dispatch(me()),
  addCandyToCart: (candyObj) => dispatch(addCandyToCart(candyObj)),
  getCart: (id) => dispatch(getCartThunk(id)),
  notLoggedIn: (cart) => dispatch(getCart(cart)),
})

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))
