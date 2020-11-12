import axios from 'axios'

const GET_USERS = 'GET_USERS'
const DELETE_USER = 'DELETE_USER'

const defaultUsers = []

const getUsers = users => ({
  type: GET_USERS,
  users
})

const removeUser = id => ({
  type: DELETE_USER,
  id
})

export const getUsersThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/admin/users')
    dispatch(getUsers(data))
  } catch (err) {
    console.error(err)
  }
}

export const removeUserThunk = id => async dispatch => {
  try {
    await axios.delete(`/api/admin/users/${id}`)
    dispatch(removeUser(id))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case DELETE_USER:
      // eslint-disable-next-line no-case-declarations
      const newState = state.filter(user => user.id !== action.id)
      return newState
    default:
      return state
  }
}
