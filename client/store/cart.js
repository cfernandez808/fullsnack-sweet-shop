import axios from 'axios'
import {updateCandy} from './singleCandy'

const GET_CART = 'GET_CART'
const DELETED_CART = 'DELETED_CART'
const UPDATE_CART = 'UPDATE_CART'

const defaultCart = []

export const getCart = (cart) => ({
  type: GET_CART,
  cart,
})

export const deletedCart = (cartId) => ({
  type: DELETED_CART,
  cartId,
})

export const getCartThunk = () => async (dispatch) => {
  try {
    let {data} = await axios.get(`/api/cart/`)
    data = data.carts.filter((x) => x.candies.length)
    data = data.map((candy) => {
      candy.candies[0].quantity = candy.quantity
      candy.candies[0].candyId = candy.candies[0].id
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
export const addCandyToCart = (candyObj) => async (dispatch) => {
  try {
    await axios.post(`/api/cart`, candyObj)
    let {data} = await axios.put(`/api/candy/quantity/${candyObj.candyId}`, {
      quantity: candyObj.quantity,
    })
    dispatch(updateCandy(data))
    dispatch(getCartThunk())
  } catch (err) {
    console.log(err)
  }
}
export const removeCart = (cartId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.delete(`/api/cart/${cartId}`)
      dispatch(updateCandy(data))
      dispatch(getCartThunk())
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateQuantity = (cartId, updatedCart, candyId, difference) => {
  return async (dispatch) => {
    try {
      await axios.put(`/api/cart/${cartId}`, updatedCart)
      let {data} = await axios.put(`/api/candy/quantity/${candyId}`, {
        quantity: difference,
      })
      dispatch(updateCandy(data))
      dispatch(getCartThunk())
    } catch (err) {
      console.log(err)
    }
  }
}

export default function (state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
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
