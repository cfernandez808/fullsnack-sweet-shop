import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {updateUserThunk, getEditUserThunk} from '../store'

class UserEditForm extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    await this.props.getEditUser(this.props.match.params.id)
    this.setState(this.props.editUser)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.updateUser(this.state)
  }
  render() {
    return (
      <div className="editUser">
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="userSubmitBox">
            <label htmlFor="firstName">
              First Name: <br />
              <input
                className="userEditInput"
                type="text"
                name="firstName"
                placeholder="User First Name"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="lastName">
              Last Name: <br />
              <input
                className="userEditInput"
                type="text"
                name="lastName"
                placeholder="User Last Name"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="category">
              Email: <br />
              <input
                className="candyEditInput"
                type="text"
                name="email"
                placeholder="Email Category"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="centerSubmit">
            <button type="submit" className="submitEditUser">
              Submit Edit
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user,
  editUser: state.editUser,
})
const mapDispatch = (dispatch) => ({
  updateUser: (user) => dispatch(updateUserThunk(user)),
  getEditUser: (id) => dispatch(getEditUserThunk(id)),
})

export default withRouter(connect(mapState, mapDispatch)(UserEditForm))
