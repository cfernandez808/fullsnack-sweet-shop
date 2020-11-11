import React from 'react'
import {connect} from 'react-redux'
import {getSingleCandyThunk} from '../store/singleCandy'
import {withRouter} from 'react-router-dom'

export class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleCandy(this.props.match.params.candyId)
  }
  render() {
    const {singleCandy} = this.props
    return (
      <div className="allProductsContainer">
        <h1>{singleCandy.name}</h1>
        {/* <img src={singleCandy.image} /> */}
        <h3>{singleCandy.description}</h3>
        <h1>${singleCandy.price}</h1>
      </div>
    )
  }
}

const mapState = (state) => ({
  singleCandy: state.singleCandy,
})

const mapDispatch = (dispatch) => ({
  getSingleCandy: (id) => dispatch(getSingleCandyThunk(id)),
})

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))
