import React from 'react'
import {connect} from 'react-redux'
import {getCandyThunk} from '../store/candy'
import {withRouter} from 'react-router-dom'
import {CandyDisplay} from './'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getCandy()
  }
  render() {
    const {candy} = this.props
    return (
      <div className="allProductsContainer">
        {candy ? (
          <>{candy.map(x => <CandyDisplay key={x.id} candy={x} />)}</>
        ) : (
          'Loading!'
        )}
      </div>
    )
  }
}

const mapState = state => ({
  candy: state.candy
})

const mapDispatch = dispatch => ({
  getCandy: () => dispatch(getCandyThunk())
})

export default withRouter(connect(mapState, mapDispatch)(AllProducts))
