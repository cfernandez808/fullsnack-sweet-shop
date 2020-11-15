import React from 'react'
import {connect} from 'react-redux'
import {getCandyThunk} from '../store/candy'
import {withRouter} from 'react-router-dom'
import {CandyDisplay, AddCandyForm, Filter} from './'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      category: 'All',
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.getCandy()
  }
  handleChange(event) {
    this.setState({category: event.target.value})
  }
  render() {
    const {candy, admin} = this.props
    return (
      <>
        {admin && <AddCandyForm />}
        {
          <Filter
            handleChange={this.handleChange}
            currentCategory={this.state.category}
          />
        }
        <div className="allProductsContainer">
          {candy ? (
            this.state.category === 'All' ? (
              <>
                {candy.map((x) => (
                  <CandyDisplay key={x.id} candy={x} />
                ))}
              </>
            ) : (
              <>
                {candy
                  .filter((y) => y.category === this.state.category)
                  .map((x) => (
                    <CandyDisplay key={x.id} candy={x} />
                  ))}
              </>
            )
          ) : (
            'Loading!'
          )}
        </div>
      </>
    )
  }
}

const mapState = (state) => ({
  candy: state.candy,
  admin: state.user.admin,
})

const mapDispatch = (dispatch) => ({
  getCandy: () => dispatch(getCandyThunk()),
})

export default withRouter(connect(mapState, mapDispatch)(AllProducts))
