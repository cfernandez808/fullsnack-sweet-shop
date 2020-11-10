'use strict'
const db = require('../server/db')
const {User, Candy} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const candies = await Promise.all([
    Candy.create({
      name: 'Gummy bears',
      description: 'fruits flavor gummy bears',
      quantity: 100,
      price: 1.0,
      image: '../public/candies/photo-1582058091505-f87a2e55a40f.jpeg'
    }),
    Candy.create({
      name: 'lollipop',
      description:
        'Lollipop candy tiramisu dragée marshmallow gummies toffee sugar plum.',
      quantity: 80,
      price: 1.55,
      image: '../public/candies/photo-1575224300306-1b8da36134ec.jpeg'
    }),
    Candy.create({
      name: 'linquorice',
      description:
        'Liquorice (British English) or licorice (American English) (/ˈlɪkərɪʃ, -ɪs/ LIK-ər-is(h)) is a confection usually flavoured and coloured black with the extract of the roots of the liquorice plant Glycyrrhiza glabra.',
      quantity: 20,
      price: 1.99,
      image: '../public/candies/photo-1499195333224-3ce974eecb47.jpeg'
    }),
    Candy.create({
      name: 'Jelly Beans',
      description:
        'Jelly beans are small bean-shaped sugar candies with soft candy shells and thick gel interiors',
      quantity: 50,
      price: 1.0,
      image: '../public/candies/photo-1581798269145-7512508289b9.jpeg'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${candies.length} candies`)
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
