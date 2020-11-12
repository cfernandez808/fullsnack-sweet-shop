import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {UserDisplay} from './'
import {getUsersThunk} from '../store/adminUsers'

export class AdminDash extends React.Component {
  componentDidMount() {
    this.props.setUsers()
  }
  render() {
    const {user, history, users} = this.props
    if (!user.admin) {
      return <div>{history.push('/')}</div>
    }
    return (
      <div className="allProductsContainer">
        {users.map(singleUser => (
          <UserDisplay key={singleUser.id} user={singleUser} />
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  users: state.users
})

const mapDispatch = dispatch => ({
  setUsers: () => dispatch(getUsersThunk())
})

export default withRouter(connect(mapState, mapDispatch)(AdminDash))
