const router = require('express').Router()
const {Cart, User, Candy} = require('../db/models')
module.exports = router

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

router.get('/', async (req, res, next) => {
  try {
    const cart = await User.findOne({
      where: {
        id: req.user.dataValues.id,
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

router.post('/', async (req, res, next) => {
  try {
    if (!req.user.dataValues.id)
      res.send('Cannot access this route unless logged in')
    else {
      const makeCart = await Cart.findOrCreate({
        where: {userId: req.user.dataValues.id, completed: false},
        include: {model: Candy, where: {id: req.body.candyId}},
        defaults: {
          quantity: req.body.quantity,
        },
      })
      if (makeCart[1] === true) {
        await makeCart[0].setCandies(req.body.candyId)
        makeCart[0].quantity = req.body.quantity
        makeCart[0].save()
      } else {
        makeCart[0].quantity = makeCart[0].quantity + req.body.quantity
        makeCart[0].save()
      }
      res.send(makeCart)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const cartToUpdate = await Cart.findByPk(req.params.id)
    if (req.user.dataValues.id === cartToUpdate.dataValues.userId) {
      cartToUpdate.quantity = req.body.quantity
      cartToUpdate.save()
      res.json(cartToUpdate)
    } else {
      res.send('Must be logged in to update this cart.')
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:cartId', async (req, res, next) => {
  try {
    let toDestroy = await Cart.findOne({
      where: {
        id: req.params.cartId,
      },
    })
    if (toDestroy.dataValues.userId === req.user.dataValues.id) {
      await toDestroy.destroy()
      res.sendStatus(204)
    } else {
      res.send('Must be logged in to remove from this cart.')
    }
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
