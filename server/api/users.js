const router = require('express').Router()
const {User} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    if (req.user && req.user.dataValues && req.user.dataValues.admin) {
      const users = await User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email'],
      })
      res.json(users)
    } else res.send('Admin access only.')
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    if (!req.user || (!req.user.admin && req.params.userId != req.user.id)) {
      return res.sendStatus(401)
    }
    const user = await User.findByPk(req.params.userId)
    res.send(user)
  } catch (err) {
    next(err)
  }
})

//updating the user info (firstName, lastname, email)

router.put('/:userId', async (req, res, next) => {
  try {
    if (!req.user || (!req.user.admin && req.params.userId != req.user.id)) {
      return res.sendStatus(401)
    }
    const user = await User.findByPk(req.params.userId)
    await user.update({
      firstName: req.body.firstName || user.firstName,
      lastName: req.body.lastName || user.lastName,
      email: req.body.email || user.email,
    })
    res.send(user)
  } catch (err) {
    next(err)
  }
})

module.exports = router
