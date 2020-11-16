const cartList = []

for (let i = 1; i < 9; i++) {
  cartList.push({
    quantity: 1,
    userId: i,
    completed: true,
  })
  cartList.push({
    quantity: 1,
    userId: i,
    completed: true,
  })
  cartList.push({
    quantity: 1,
    userId: i,
    completed: false,
  })
}

module.exports = cartList
