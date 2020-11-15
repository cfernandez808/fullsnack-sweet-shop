const Sequelize = require('sequelize')
const db = require('../db')

const CartCandy = db.define('cart_candy', {
  quantity: {
    type: Sequelize.INTEGER,
  },
  price: {
    type: Sequelize.INTEGER,
  },
})

module.exports = CartCandy
