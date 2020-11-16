import axios from 'axios'

const GET_CART = 'GET_CART'
const DELETED_CART = 'DELETED_CART'
const UPDATE_CART = 'UPDATE_CART'

const defaultCart = []

const getCart = (cart) => ({
  type: GET_CART,
  cart,
})

export const deletedCart = (cartId) => ({
  type: DELETED_CART,
  cartId,
})

const updateCart = (cart) => ({
  type: UPDATE_CART,
  cart,
})

export const getCartThunk = (id) => async (dispatch) => {
  try {
    let {data} = await axios.get(`/api/cart/${id}`)
    data = data.carts.filter((x) => x.candies.length)
    data = data.map((candy) => {
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
    dispatch(getCartThunk(userId))
  } catch (err) {
    console.log(err)
  }
}
export const removeCart = (cartId, userId) => {
  return async (dispatch) => {
    try {
      console.log('IN THUNK', userId)
      await axios.delete(`/api/cart/${cartId}`)
      dispatch(getCartThunk(userId))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateQuantity = (cartId, updatedCart, userId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/cart/${cartId}`, updatedCart)
      console.log('AFTER PUT', data)
      dispatch(getCartThunk(userId))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function (state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    // case DELETED_CART:
    //   console.log('IN DELETED', state, action.cartId)
    //   let newState = state.filter((cart) => cart.id !== action.cartId)
    //   console.log('NEW STATE', newState)
    //   return newState
    case UPDATE_CART:
      // eslint-disable-next-line no-case-declarations
      return [
        ...state.map((cart) => {
          if (cart.id === action.cart.id) {
            cart = action.cart
          }
          return cart
        }),
      ]
    default:
      return state
  }
}
