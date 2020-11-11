const router = require('express').Router()
const {Candy} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const candy = await Candy.findAll()
    res.json(candy)
  } catch (err) {
    next(err)
  }
})

router.get('/:candyId', async (req, res, next) => {
  try {
    const candy = await Candy.findByPk(req.params.candyId)
    res.json(candy)
  } catch (err) {
    next(err)
  }
})
