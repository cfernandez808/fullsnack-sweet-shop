import React from 'react'
import {connect} from 'react-redux'
import {fetchCartHistory} from '../store'
import {SingleCandyCart} from './'
import {withRouter} from 'react-router-dom'

class CartHistory extends React.Component {
  componentDidMount() {
    this.props.fetchCartHistory(this.props.match.params.id)
  }
  render() {
    const carts = this.props.carts || []
    return (
      <div className="cartHistory">
        <h1>Cart History</h1>
        <ul>
          {carts.map((cart) => (
            <li key={cart.id}>
              <p>Total items ordered: {cart.quantity}</p>
              <div className="allProductsContainer">
                {cart.candies.map((candy) => (
                  <SingleCandyCart
                    key={candy.id}
                    candy={candy}
                    quantity={cart.quantity}
                    history={true}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapState = (state) => ({
  carts: state.cartHistory,
})

const mapDispatch = (dispatch) => ({
  fetchCartHistory: (id) => dispatch(fetchCartHistory(id)),
})

export default withRouter(connect(mapState, mapDispatch)(CartHistory))
