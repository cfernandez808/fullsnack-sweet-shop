const path = require('path')
const express = require('express')
const morgan = require('morgan')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 8080
const app = express()
const socketio = require('socket.io')
const stripe = require('stripe')(
  'sk_test_51HnybfFEiVZX0xQou7QCQc8tNJEk272pLdljS23niOHEhm3LUYvIvur9mKgqyogOrJIACMbrtdpNPfH3anfrVAk300emsOfJMg'
)
module.exports = app

// This is a global Mocha hook, used for resource cleanup.
// Otherwise, Mocha v4+ never quits after tests.
if (process.env.NODE_ENV === 'test') {
  after('close the session store', () => sessionStore.stopExpiringSessions())
}

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
if (process.env.NODE_ENV !== 'production') require('../secrets')

// passport registration
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // compression middleware
  app.use(compression())

  // session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  const isAdmin = (req, res, next) => {
    if (req.user && req.user.dataValues && req.user.dataValues.admin) {
      req.admin = true
    }
    next()
  }

  app.use(isAdmin)

  // auth and api routes
  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  // eslint-disable-next-line complexity
  app.post('/create-checkout-session', async (req, res, next) => {
    const datas = {
      'Gummy Worms': {
        price: 'price_1HoYTaFEiVZX0xQoK3qhAsoL',
        product: 'prod_IPNEDwPto75LxO',
        unit_amount_decimal: 199,
      },
      'Fruit Chews': {
        price: 'price_1HoYTDFEiVZX0xQo2qkyEEo7',
        product: 'prod_IPND54VBHRGs4Q',
        unit_amount_decimal: 299,
      },
      Lollipop: {
        price: 'price_1HoYScFEiVZX0xQoUrobRM8y',
        product: 'prod_IPNDV1wVdp6aS1',
        unit_amount_decimal: 299,
      },
      'Sweet Hearts': {
        price: 'price_1HoYRsFEiVZX0xQoPPEd7unI',
        product: 'prod_IPNCYTNPUw1XFF',
        unit_amount_decimal: 499,
      },
      'Hard Candies': {
        price: 'price_1HoYRJFEiVZX0xQoRNzG1fkA',
        product: 'prod_IPNBG7qDLgRMa3',
        unit_amount_decimal: 199,
      },
      'Fruit Crunches': {
        price: 'price_1HoYQdFEiVZX0xQoPFxZWbBq',
        product: 'prod_IPNAFiYdyIGPWo',
        unit_amount_decimal: 99,
      },
      'Candy Canes': {
        price: 'price_1HoYQ5FEiVZX0xQoNYNpDdfJ',
        product: 'prod_IPNAQ8yQieb8LD',
        unit_amount_decimal: 299,
      },
      'Gummy Bears': {
        price: 'price_1HoYPZFEiVZX0xQoX1cN33qU',
        product: 'prod_IPN9EMoZPgesLo',
        unit_amount_decimal: 99,
      },
      'Jelly Beans': {
        price: 'price_1HoYOdFEiVZX0xQo8nRD4Mwo',
        product: 'prod_IPN8f4vH9871nA',
        unit_amount_decimal: 199,
      },
    }
    try {
      const cart = req.body.cart
      const order = cart.map((el) => ({
        quantity: el.quantity,
        price_data: {
          currency: req.body.currency,
          product: datas[el.name].product,
          unit_amount_decimal: datas[el.name].unit_amount_decimal,
        },
      }))
      const session = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:8080/confirmation',
        cancel_url: 'http://localhost:8080/failure',
        payment_method_types: ['card'],
        mode: 'payment',
        discounts: [
          {
            coupon: 'coFKkQAN',
          },
        ],
        line_items: order,
      })
      session.currency = req.body.currency
      console.log(session)
      res.json({id: session.id})
    } catch (err) {
      next(err)
    }
  })
  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))
  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )

  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}

const syncDb = () => db.sync()

async function bootApp() {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  await startListening()
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp()
} else {
  createApp()
}
