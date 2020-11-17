import React from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import axios from 'axios'

const Payment = ({price}) => {
  const handleFormSubmit = async (ev) => {
    ev.preventDefault()

    const firstName = ev.target.firstName.value
    const lastName = ev.target.lastName.value
    const email = ev.target.email.value
    const shippingAddress = ev.target.shippingAddress.value
    const billingAddress = ev.target.billingAddress.value

    const billingDetails = {
      firstName,
      lastName,
      email,
      shippingAddress,
      billingAddress,
    }

    const {data: clientSecret} = await axios.post('/api/payment_intents', {
      amount: price * 100,
    })
    console.log(clientSecret)
  }

  return (
    <div>
      <CardElement />
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="firstName" placeholder="First Name" />
        <br />
        <input type="text" name="lastName" placeholder="Last Name" />
        <br />
        <input type="text" name="email" placeholder="email" />
        <br />
        <input
          type="text"
          name="shippingAddress"
          placeholder="Shipping Address"
        />
        <br />
        <input
          type="text"
          name="billingAddress"
          placeholder="Billing Address"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Payment
