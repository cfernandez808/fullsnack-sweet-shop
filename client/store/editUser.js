import axios from 'axios'

export const UPDATE_USER = 'UPDATE_USER'
const GOT_EDIT_USER = 'GOT_EDIT_USER'

const updateUser = (user) => ({type: UPDATE_USER, user})
const gotEditUser = (user) => ({type: GOT_EDIT_USER, user})

export const updateUserThunk = (user) => async (dispatch) => {
  try {
    const {data} = await axios.put(`/api/users/${user.id}`, user)
    dispatch(updateUser(data))
  } catch (err) {
    console.log(err)
  }
}

export const getEditUserThunk = (id) => async (dispatch) => {
  try {
    const {data} = await axios.get(`/api/users/${id}`)
    dispatch(gotEditUser(data))
  } catch (err) {
    console.log(err)
  }
}

export default function (state = {}, action) {
  switch (action.type) {
    case UPDATE_USER:
      return action.user
    case GOT_EDIT_USER:
      return action.user
    default:
      return state
  }
}
