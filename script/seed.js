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

  const candies = [
    {
      name: 'Gummy bears',
      description: 'fruits flavor gummy bears',
      quantity: 100,
      price: 1.0,
      imageUrl:
        'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
    },
    {
      name: 'lollipop',
      description:
        'Lollipop candy tiramisu dragée marshmallow gummies toffee sugar plum.',
      quantity: 80,
      price: 1.55,
      imageUrl:
        'https://images.unsplash.com/photo-1575224300306-1b8da36134ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1275&q=80'
    },
    {
      name: 'linquorice',
      description:
        'Liquorice (British English) or licorice (American English) (/ˈlɪkərɪʃ, -ɪs/ LIK-ər-is(h)) is a confection usually flavoured and coloured black with the extract of the roots of the liquorice plant Glycyrrhiza glabra.',
      quantity: 20,
      price: 1.99,
      imageUrl:
        'https://images.unsplash.com/photo-1533602933119-70608e48905d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
    },
    {
      name: 'Jelly Beans',
      description:
        'Jelly beans are small bean-shaped sugar candies with soft candy shells and thick gel interiors',
      quantity: 50,
      price: 1.0,
      imageUrl:
        'https://images.unsplash.com/photo-1519686997393-7bdb73d6c54d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
    },
    {
      name: 'Hard Candy ',
      description:
        'A hard candy, or boiled sweet, is a sugar candy prepared from one or more sugar-based syrups',
      quantity: 50,
      price: 1.0,
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/1/13/HardCandy.jpg'
    }
  ]

  console.log(`seeded ${users.length} users`)
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
