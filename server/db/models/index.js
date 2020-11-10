
const Order = require('./order')
const Cart = require('./cart')
const Candy = require('./candy')
const User = require('./user')
// Cart.hasMany(Product)
// Product.belongsTo(Cart)

Cart.belongsTo(User)
User.hasOne(Cart)

Order.belongsTo(User)
User.hasMany(Order)

module.exports = {
  User,
  Order,
  Cart,
  Candy
}
