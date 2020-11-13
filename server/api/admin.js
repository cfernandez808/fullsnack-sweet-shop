const router = require('express').Router()
const {User, Candy} = require('../db/models')
module.exports = router

//GET: /admin/users
router.get('/users', async (req, res, next) => {
  try {
    if (req.user && req.user.dataValues && req.user.dataValues.admin) {
      const users = await User.findAll()
      res.json(users)
    } else res.send('Admin access only.')
  } catch (err) {
    next(err)
  }
})

router.delete('/users/:id', async (req, res, next) => {
  try {
    if (req.user && req.user.dataValues && req.user.dataValues.admin) {
      await User.destroy({
        where: {
          id: req.params.id,
        },
      })
      res.sendStatus(200)
    } else res.send('Admin access only.')
  } catch (err) {
    next(err)
  }
})

router.get('/candy', async (req, res, next) => {
  try {
    if (req.user && req.user.dataValues && req.user.dataValues.admin) {
      const candies = await Candy.findAll()
      res.json(candies)
    } else res.send('Admin access only.')
  } catch (err) {
    next(err)
  }
})
