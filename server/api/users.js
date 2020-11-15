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

//updating the user info (firstName, lastname, email)

router.put('/:userId', async (req, res, next) => {
  try {
    const [numberAffectedRow, user] = await User.update(req.body, {
      where: {
        id: req.params.userId,
      },
      returning: true, //needed for affectedRows to be populated
      plain: true, //makes sure that the returned instances are just plain objects
    })
    console.log('DATA', user.dataValues)
    res.send(user.dataValues)
  } catch (err) {
    next(err)
  }
})

module.exports = router
