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
    console.log('CANDY', singleCandy)
    return <div className="allProductsContainer" />
  }
}

const mapState = state => ({
  singleCandy: state.singleCandy
})

const mapDispatch = dispatch => ({
  getSingleCandy: id => dispatch(getSingleCandyThunk(id))
})

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))
