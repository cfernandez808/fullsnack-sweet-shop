import React from 'react'
import {connect} from 'react-redux'
import {getSingleCandyThunk} from '../store/singleCandy'
import {addCandyToCart} from '../store/cart'
import {withRouter} from 'react-router-dom'
import {EditCandyForm} from './'

export class SingleProduct extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getSingleCandy(this.props.match.params.candyId)
  }

  handleClick() {
    let userId = this.props.user.id
    let candyObj = {
      quantity: 1,
      candyId: this.props.singleCandy.id
    }
    this.props.addCandyToCart(userId, candyObj)
  }

  render() {

    const {singleCandy, user} = this.props

    return (
      <>
        <div
          className="singleCandyContainer"
          style={
            user.admin
              ? {}
              : {
                  borderBottomRightRadius: '20px',
                  borderBottomLeftRadius: '20px'
                }
          }
        >
          <div className="singleCandyImg">
            <img src={singleCandy.image} />
          </div>
          <div className="singleCandyRight">
            <div className="singleCandyTopInfo">
              <div>
                <h1>{singleCandy.name}</h1>
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
              <div className="singleCandyMinusButton">-</div>
              <div>Quantity</div>
              <div className="singleCandyPlusButton">+</div>
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
      </>
    )
  }
}

const mapState = state => ({
  singleCandy: state.singleCandy,
  user: state.user
})

const mapDispatch = dispatch => ({
  getSingleCandy: id => dispatch(getSingleCandyThunk(id)),
  addCandyToCart: (userId, candyObj) =>
    dispatch(addCandyToCart(userId, candyObj))
})

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))
