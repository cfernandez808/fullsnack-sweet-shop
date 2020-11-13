const cartCandyList = []

for (let i = 1; i < 24; i++) {
  cartCandyList.push({
    candyId: i + 7,
    cartId: i,
  })
}

module.exports = cartCandyList
