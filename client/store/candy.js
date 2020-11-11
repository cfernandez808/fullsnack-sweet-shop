import axios from 'axios'

const GET_CANDY = 'GET_CANDY'
// const REMOVE_CANDY = 'REMOVE_CANDY'

const defaultCandy = []

const getCandy = candy => ({type: GET_CANDY, candy})
// const removeCandy = () => ({type: REMOVE_CANDY})

export const getCandyThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/candy')
    dispatch(getCandy(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultCandy, action) {
  switch (action.type) {
    case GET_CANDY:
      return action.candy
    default:
      return state
  }
}
