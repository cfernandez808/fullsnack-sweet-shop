const router = require('express').Router()
module.exports = router

if (process.env.NODE_ENV !== 'production') require('../../secrets')

let teamEmails = []

if (process.env.TEAMEMAILS) {
  teamEmails = process.env.TEAMEMAILS.split(',')
}

const mailgun = require('mailgun-js')({
  apiKey: process.env.APIKEY,
  domain: process.env.DOMAIN,
})

router.post('/', (req, res, next) => {
  try {
    let totalPrice = 0

    const cart = req.body.cart
      .map((item) => {
        totalPrice += (item.price * item.quantity) / 100
        return `(${item.quantity}) ${item.name}, $${item.price / 100}`
      })
      .join('\n')

    let email = ''

    if (teamEmails.includes(req.user.email)) {
      email = req.user.email
    } else {
      email = process.env.DEFAULTEMAIL
    }

    const data = {
      from: `Fullsnack Sweet Shop <me@${process.env.DOMAIN}>`,
      /* the to: line should reference the buyer's email but that
      required my credit card information :( so sending to only one
      email address for free to verify functionality */
      to: `${email}`,
      subject: `Thanks for shopping with us! Here's your order confirmation.`,
      text: `Confirming your order of: \n${cart} \nTotal: $${totalPrice}`,
    }

    mailgun.messages().send(data, function (error, body) {
      if (error) {
        throw error
      } else {
        console.log('Email Sent! Body: ', body)
      }
    })
  } catch (err) {
    next(err)
  }
})
