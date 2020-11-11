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
