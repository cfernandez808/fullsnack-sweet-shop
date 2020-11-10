const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  productIds: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  totalCost: {
    type: Sequelize.DECIMAL(10, 2)
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'Pending'
  }
})

module.exports = Order
