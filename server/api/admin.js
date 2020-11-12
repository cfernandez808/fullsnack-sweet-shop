const router = require('express').Router()
const {User, Candy} = require('../db/models')
module.exports = router

//GET: /admin/users
router.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.delete('/users/:id', async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.get('/candy', async (req, res, next) => {
  try {
    const candies = await Candy.findAll()
    res.json(candies)
  } catch (err) {
    next(err)
  }
})
