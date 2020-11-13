const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

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
