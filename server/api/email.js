const router = require('express').Router()
const emailGenerator = require('./emailGenerator')
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
        return `<tr>
        <td class="em_grey" align="left" valign="top" style="font-family: Arial, sans-serif; font-size: 18px; line-height: 22px; color:#434343; font-weight:bold;">${
          item.name
        }</td>
      </tr>
      <tr>
        <td height="13" style="height:13px; font-size:1px; line-height:1px;">&nbsp;</td>
      </tr>
      <tr>
        <td class="em_grey" align="left" valign="top" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 20px; color:#434343;">Quantity: <span style="color:#da885b; font-weight:bold;">${
          item.quantity
        }</span></td>
      </tr>
      <tr>
        <td height="13" style="height:13px; font-size:1px; line-height:1px;">&nbsp;</td>
      </tr>
      <tr>
        <td class="em_grey" align="left" valign="top" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 20px; color:#434343;">Amount: <span style="color:#da885b; font-weight:bold;">$${
          item.price / 100
        }</span></td>
      </tr>
      <br />
`
      })
      .join('\n')

    let email = ''

    if (teamEmails.includes(req.user.email)) {
      email = req.user.email
    } else {
      email = process.env.DEFAULTEMAIL
    }

    const data = emailGenerator(email, req.user, cart, totalPrice)

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
