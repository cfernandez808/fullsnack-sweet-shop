import axios from 'axios'

const GOT_USER_CART_HISTORY = 'GOT_USER_CART_HISTORY'

const defaultUserOrders = []

const gotUserCartHistory = (carts) => ({type: GOT_USER_CART_HISTORY, carts})

export const fetchCartHistory = (id) => async (dispatch) => {
  try {
    const {data} = await axios.get(`/api/cart/byuser/${id}`)
    dispatch(gotUserCartHistory(data))
  } catch (err) {
    console.log(err)
  }
}

export default function (state = defaultUserOrders, action) {
  switch (action.type) {
    case GOT_USER_CART_HISTORY:
      return action.carts
    default:
      return state
  }
}
