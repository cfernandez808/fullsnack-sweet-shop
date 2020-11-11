const router = require('express').Router()
const {Cart, User, Candy} = require('../db/models')
module.exports = router

router.get('/test', (req, res, next) => {
  console.log('Current logged in user is:', req.user.dataValues.id)
  res.send()
})

router.get('/:id', async (req, res, next) => {
  try {
    const cart = await User.findOne({
      where: {
        id: req.params.id
      },
      include: {model: Cart, include: {model: Candy}}
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

//User id -> Cart -> CartId and ProductId tied to cart through Cart_Product table

//Needs UserId from User Table, Cart Quantity + UserId, Cart_Product ProductId + CartId

//Needs quantity and candyId in req.body gets userId from req.params.id

router.post('/:id', async (req, res, next) => {
  try {
    const makeCart = await Cart.create({
      quantity: req.body.quantity,
      userId: req.params.id
    })
    await makeCart.setCandies(req.body.candyId)
    res.send(makeCart)
  } catch (err) {
    next(err)
  }
})
