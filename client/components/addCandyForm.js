import React from 'react'
import {connect} from 'react-redux'
import {addCandyThunk} from '../store/candy'
import {withRouter} from 'react-router-dom'

class NewCandyForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      category: '',
      price: '',
      image: '',
      quantity: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()

    this.props.candyAdd(this.state)
    this.setState({
      name: '',
      description: '',
      category: '',
      price: '',
      image: '',
      quantity: ''
    })
  }
  // eslint-disable-next-line complexity
  render() {
    return (
      <form onSubmit={this.handleSubmit} autoComplete="off">
        <div className="candySubmitBox">
          <div className="candySubmit">
            <label htmlFor="name">
              Name: <br />
              <input
                className="newCandyNameInput"
                type="text"
                name="name"
                placeholder="Candy Name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="description">
              Description: <br />
              <input
                className="newCandyDescriptionInput"
                type="text"
                name="description"
                placeholder="Candy Description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="category">
              Category: <br />
              <input
                className="newCandyCategoryInput"
                type="text"
                name="category"
                placeholder="Candy Category"
                value={this.state.category}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="price">
              Price: <br />
              <input
                className="newCandyPriceInput"
                type="text"
                name="price"
                placeholder="Candy Price"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="image">
              Image: <br />
              <input
                className="newCandyImageInput"
                type="text"
                name="image"
                placeholder="Candy Image"
                value={this.state.image}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="quantity">
              Quantity: <br />
              <input
                className="newCandyQuantityInput"
                type="text"
                name="quantity"
                placeholder="Candy Quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
              />
            </label>
            <button type="submit" className="submitNewCandy">
              Submit
            </button>
          </div>
        </div>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  candyAdd: candy => dispatch(addCandyThunk(candy))
})

export default withRouter(connect(null, mapDispatch)(NewCandyForm))
