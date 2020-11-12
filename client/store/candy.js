import axios from 'axios'

const GET_CANDY = 'GET_CANDY'
const REMOVE_CANDY = 'REMOVE_CANDY'
const UPDATE_CANDY = 'UPDATE_CANDY'
const ADD_CANDY = 'ADD_CANDY'

const defaultCandy = []

const getCandy = candy => ({type: GET_CANDY, candy})
const removeCandy = id => ({type: REMOVE_CANDY, id})
const updateCandy = candy => ({type: UPDATE_CANDY, candy})
const addCandy = candy => ({type: ADD_CANDY, candy})

export const getCandyThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/candy')
    dispatch(getCandy(data))
  } catch (err) {
    console.error(err)
  }
}

export const removeCandyThunk = id => async dispatch => {
  try {
    await axios.delete(`/api/candy/${id}`)
    dispatch(removeCandy(id))
  } catch (err) {
    console.error(err)
  }
}

export const updateCandyThunk = candy => async dispatch => {
  try {
    const {data} = await axios.put(`/api/candy/${candy.id}`, candy)
    dispatch(updateCandy(data))
  } catch (err) {
    console.error(err)
  }
}

export const addCandyThunk = candy => async dispatch => {
  try {
    const {data} = await axios.post('/api/candy', candy)
    dispatch(addCandy(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultCandy, action) {
  switch (action.type) {
    case GET_CANDY:
      return action.candy
    case REMOVE_CANDY:
      // eslint-disable-next-line no-case-declarations
      const newState = state.filter(candy => candy.id !== action.id)
      return newState
    case UPDATE_CANDY:
      // eslint-disable-next-line no-case-declarations
      const updateState = state.filter(candy => candy.id !== action.candy.id)
      return [...updateState, action.candy]
    case ADD_CANDY:
      return [...state, action.candy]
    default:
      return state
  }
}
