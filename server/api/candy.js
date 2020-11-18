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

router.delete('/:id', async (req, res, next) => {
  try {
    if (req.admin) {
      const test = await Candy.destroy({
        where: {
          id: req.params.id,
        },
      })
      if (test > 0) {
        res.sendStatus(200)
      } else {
        res.sendStatus(500)
      }
    } else res.send('Admin access only.')
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.admin) {
      res.json(await Candy.create(req.body))
    } else res.send('Admin access only.')
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    if (req.admin) {
      const candy = await Candy.findByPk(req.params.id)
      const updatedCandy = await candy.update(req.body)
      res.json(updatedCandy)
    } else res.send('Admin access only.')
  } catch (err) {
    next(err)
  }
})

router.put('/quantity/:id', async (req, res, next) => {
  try {
    const candy = await Candy.findByPk(req.params.id)
    candy.quantity = candy.quantity - req.body.quantity
    candy.save()
    res.json(candy)
  } catch (err) {
    next(err)
  }
})
