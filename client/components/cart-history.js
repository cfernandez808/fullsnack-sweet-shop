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
    console.log('CARTS', carts)
    return (
      <div className="main">
        <div className="cartHistory">
          <h1>Cart History</h1>
          <div className="allProductsContainer">
            {carts.map((cart) =>
              cart.candies.map((candy) => (
                <SingleCandyCart
                  key={candy.id}
                  candy={candy}
                  quantity={cart.quantity}
                  history={true}
                />
              ))
            )}
          </div>
        </div>
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
