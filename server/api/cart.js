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
        id: req.params.id,
      },
      include: {model: Cart, include: {model: Candy}},
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
      userId: req.params.id,
    })
    await makeCart.setCandies(req.body.candyId, {
      through: {quantity: req.body.quantity},
    })
    res.send(makeCart)
  } catch (err) {
    next(err)
  }
})

router.delete('/:cartId', async (req, res, next) => {
  try {
    await Cart.destroy({
      where: {
        id: req.params.cartId,
      },
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    let completedCart = []
    for (let candy of req.body.cart) {
      let item = await Cart.findByPk(candy.id)
      item.completed = true
      const updatedItem = await item.save()
      completedCart.push(updatedItem)
    }
    res.json(completedCart)
  } catch (err) {
    next(err)
  }
})

router.get('/byuser/:id', async (req, res, next) => {
  try {
    if (!req.user || (!req.user.admin && req.params.id != req.user.id)) {
      return res.sendStatus(401)
    }
    const orders = await Cart.findAll({
      where: {
        completed: true,
        userId: req.params.id,
      },
      include: [{model: Candy}],
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
