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
      price: 'All',
    }
    this.handleChangeCategory = this.handleChangeCategory.bind(this)
    this.handleChangePrice = this.handleChangePrice.bind(this)
  }
  componentDidMount() {
    this.props.getCandy()
  }
  handleChangeCategory(event) {
    this.setState({category: event.target.value})
  }
  handleChangePrice(event) {
    this.setState({price: event.target.value})
  }
  render() {
    const {candy, admin} = this.props
    return (
      <>
        <div className="main">
          <Filter
            handleChangeCategory={this.handleChangeCategory}
            handleChangePrice={this.handleChangePrice}
            currentCategory={this.state.category}
            currentPrice={this.state.category}
          />
          {admin && <AddCandyForm />}
          <div className="allProductsContainer">
            {candy ? (
              candy
                .filter((y) => {
                  if (
                    this.state.category !== 'All' &&
                    this.state.price !== 'All'
                  ) {
                    return (
                      y.category === this.state.category &&
                      y.price === +this.state.price
                    )
                  } else if (this.state.category !== 'All') {
                    return y.category === this.state.category
                  } else if (this.state.price !== 'All') {
                    return y.price === +this.state.price
                  } else {
                    return y
                  }
                })
                .map((x) => <CandyDisplay key={x.id} candy={x} />)
            ) : (
              <>'Loading!'</>
            )}
          </div>
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
