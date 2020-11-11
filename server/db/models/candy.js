const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('candy', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  category: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue: '/candies/hearts.jpeg',
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 100,
    },
  },
})
