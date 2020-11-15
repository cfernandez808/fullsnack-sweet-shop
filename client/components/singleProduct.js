import React from 'react'
import {connect} from 'react-redux'
import {getSingleCandyThunk} from '../store/singleCandy'
import {addCandyToCart, getCartThunk} from '../store/cart'
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
    this.cartReducer = this.cartReducer.bind(this)
    this.quantityFinder = this.quantityFinder.bind(this)
  }

  async componentDidMount() {
    this.props.getSingleCandy(this.props.match.params.candyId)
    await this.props.getUser()
    this.props.getCart(this.props.user.id)
  }

  handleClick() {
    let userId = this.props.user.id
    let candyObj = {
      quantity: this.state.quantity,
      candyId: this.props.singleCandy.id,
    }
    this.props.addCandyToCart(userId, candyObj)
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
    const {singleCandy, user} = this.props
    let {cart} = this.props
    let reducedCart, quantities
    if (cart.length > 0) {
      reducedCart = this.cartReducer()
      quantities = this.quantityFinder()
      reducedCart.sort((x, y) =>
        x.name === singleCandy.name ? -1 : y.name === singleCandy.name ? 1 : 0
      )
    }
    return (
      <>
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
              <div
                className="singleCandyAddToCartButton"
                onClick={this.handleClick}
              >
                Add to Cart
              </div>
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
        <div className="singleCandyCartLabel">Cart Display:</div>
        <div className="singleCandyCartDisplay">
          {reducedCart && reducedCart.length > 0 ? (
            reducedCart.map((candy) => (
              <SingleCandyCart
                key={candy.id}
                candy={candy}
                quantity={quantities[candy.cart_candy.candyId]}
              />
            ))
          ) : (
            <div className="emptySingleCandyCart">
              <div className="welcome">Cart Empty</div>
            </div>
          )}
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
  addCandyToCart: (userId, candyObj) =>
    dispatch(addCandyToCart(userId, candyObj)),
  getCart: (id) => dispatch(getCartThunk(id)),
})

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))
