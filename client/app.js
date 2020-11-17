import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
const stripePromise = loadStripe(
  'pk_test_51HnybfFEiVZX0xQop0LgXy01heoTBVBfZndolDlWejdSYPeeg63R32DXL5FGH7bySutRAGmgrt2iGYEddeVHTKl700BxpaUe3v'
)

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <Navbar />
      <Routes />
    </Elements>
  )
}

export default App
