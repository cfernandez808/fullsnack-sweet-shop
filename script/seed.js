'use strict'
const db = require('../server/db')
const {User, Candy, Cart, CartCandy} = require('../server/db/models')
const candyList = require('./candyseed')
const userList = require('./userseed')
const cartList = require('./cartseed')
const cartCandyList = require('./cart_candyseed')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all(userList.map((user) => User.create(user)))

  const candies = await Promise.all(
    candyList.map((candy) => Candy.create(candy))
  )

  const carts = await Promise.all(cartList.map((cart) => Cart.create(cart)))

  const cartCandies = await Promise.all(
    cartCandyList.map((element) => CartCandy.create(element))
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${candies.length} candies`)
  console.log(`seeded ${carts.length} carts`)
  console.log(`seeded ${cartCandies.length} cart_candies`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
