import axios from 'axios'

const GET_SINGLE_CANDY = 'GET_SINGLE_CANDY'

const defaultSingleCandy = {}

const getSingleCandy = candy => ({type: GET_SINGLE_CANDY, candy})

export const getSingleCandyThunk = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/candy/${id}`)
    dispatch(getSingleCandy(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultSingleCandy, action) {
  switch (action.type) {
    case GET_SINGLE_CANDY:
      return action.candy
    default:
      return state
  }
}
