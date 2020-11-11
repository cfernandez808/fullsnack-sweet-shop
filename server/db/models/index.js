// const Order = require('./order')
const Cart = require('./cart')
const Candy = require('./candy')
const User = require('./user')

Candy.belongsToMany(Cart, {through: 'cart_candy'})
Cart.belongsToMany(Candy, {through: 'cart_candy'})

// Candy.belongsToMany(Order, {through: 'order_candy'})
// Order.belongsToMany(Candy, {through: 'order_candy'})

Cart.belongsTo(User)
User.hasMany(Cart)

// Order.belongsTo(User)
// User.hasMany(Order)

module.exports = {
  User,
  // Order,
  Cart,
  Candy
}
