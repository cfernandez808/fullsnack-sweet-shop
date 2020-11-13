import React from 'react'
import {connect} from 'react-redux'
import {getCandyThunk} from '../store/candy'
import {withRouter} from 'react-router-dom'
import {CandyDisplay, AddCandyForm} from './'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getCandy()
  }
  render() {
    const {candy, admin} = this.props
    return (
      <>
        {admin && <AddCandyForm />}
        <div className="allProductsContainer">
          {candy ? (
            <>{candy.map(x => <CandyDisplay key={x.id} candy={x} />)}</>
          ) : (
            'Loading!'
          )}
        </div>
      </>
    )
  }
}

const mapState = state => ({
  candy: state.candy,
  admin: state.user.admin
})

const mapDispatch = dispatch => ({
  getCandy: () => dispatch(getCandyThunk())
})

export default withRouter(connect(mapState, mapDispatch)(AllProducts))
