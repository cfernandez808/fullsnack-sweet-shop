import axios from 'axios'

const GET_CART = 'GET_CART'
const DELETED_CART = 'DELETED_CART'

const defaultCart = {}

const getCart = (cart) => ({
  type: GET_CART,
  cart,
})

export const deletedCart = (cartId) => ({
  type: DELETED_CART,
  cartId,
})

export const getCartThunk = (id) => async (dispatch) => {
  try {
    let {data} = await axios.get(`/api/cart/${id}`)
    data = data.carts.map((candy) => {
      candy.candies[0].quantity = candy.quantity
      candy.candies[0].id = candy.id
      candy.candies[0].completed = candy.completed
      return candy.candies[0]
    })
    dispatch(getCart(data))
  } catch (err) {
    console.error(err)
  }
}


export const checkoutThunk = (cartArr) => async (dispatch) => {
  try {
    await axios.put('/api/cart/checkout', {cart: cartArr})
    dispatch(getCart({}))
  } catch (err) {
    console.error(err)
  }
}
export const addCandyToCart = (userId, candyObj) => async (dispatch) => {
  try {
    await axios.post(`/api/cart/${userId}`, candyObj)
    getCartThunk(userId)
  } catch (err) {
    console.log(err)
  }
}
export const removeCart = (cartId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/cart/${cartId}`)
      dispatch(deletedCart(cartId))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function (state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case DELETED_CART:
      return state.filter((cart) => cart.id !== action.cartId)
    default:
      return state
  }
}
