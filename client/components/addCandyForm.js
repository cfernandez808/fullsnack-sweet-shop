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
      quantity: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    if (this.state.image.length > 0) {
      this.props.candyAdd(this.state)
    } else {
      this.props.candyAdd({
        name: this.state.name,
        description: this.state.description,
        category: this.state.category,
        price: this.state.price,
        quantity: this.state.quantity,
      })
    }
    this.setState({
      name: '',
      description: '',
      category: '',
      price: '',
      image: '',
      quantity: '',
    })
  }
  // eslint-disable-next-line complexity
  render() {
    return (
      <div className="main">
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="addCandySubmitBox">
            <div className="addCandySubmit">
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
                {this.state.name.length > 0 ? (
                  <div className="accepted">Accepted</div>
                ) : (
                  <div className="warning">Name Required</div>
                )}
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
                {this.state.description.length > 0 ? (
                  <div className="accepted">Accepted</div>
                ) : (
                  <div className="warning">Description Required</div>
                )}
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
                {this.state.category.length > 0 ? (
                  <div className="accepted">Accepted</div>
                ) : (
                  <div className="warning">Category Required</div>
                )}
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
                {!isNaN(this.state.price) &&
                this.state.price % 1 === 0 &&
                this.state.price > 0 ? (
                  <div className="accepted">Accepted</div>
                ) : (
                  <div className="warning">Must be an integer</div>
                )}
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
                <div className="accepted">Default used if blank</div>
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
                {!isNaN(this.state.quantity) &&
                this.state.quantity % 1 === 0 &&
                this.state.quantity > 0 &&
                this.state.quantity < 101 ? (
                  <div className="accepted">Accepted</div>
                ) : (
                  <div className="warning">Integer. Max 100.</div>
                )}
              </label>
            </div>
            <div className="addCandySubmit">
              {this.state.name.length > 0 &&
                this.state.description.length > 0 &&
                this.state.category.length > 0 &&
                !isNaN(this.state.price) &&
                this.state.price % 1 === 0 &&
                this.state.price > 0 &&
                !isNaN(this.state.quantity) &&
                this.state.quantity % 1 === 0 &&
                this.state.quantity > 0 &&
                this.state.quantity < 101 && (
                  <button type="submit" className="submitNewCandy">
                    Add Candy
                  </button>
                )}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  candyAdd: (candy) => dispatch(addCandyThunk(candy)),
})

export default withRouter(connect(null, mapDispatch)(NewCandyForm))
