import axios from 'axios'

const GET_CART = 'GET_CART'

const defaultCart = {}

const getCart = cart => ({
  type: GET_CART,
  cart
})

export const getCartThunk = id => async dispatch => {
  try {
    let {data} = await axios.get(`/api/cart/${id}`)
    data = data.carts.map(candy => {
      candy.candies[0].quantity = candy.quantity
      candy.candies[0].id = candy.id
      return candy.candies[0]
    })
    dispatch(getCart(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
