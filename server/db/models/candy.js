const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('candy', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  decription: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL(5, 2),
    validate: {
      min: 0
    }
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue: '../../../public/candies'
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 100
    }
  }
})
