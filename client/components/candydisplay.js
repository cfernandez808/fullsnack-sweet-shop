import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

const CandyDisplay = props => {
  const {id, name, description, price, image, quantity} = props.candy
  return (
    <>
      <div key={id} className="candyContainer">
        {/* <Link to={`/candy/${id}`}> */}
        <img src={image} />
        {/* </Link> */}
        <div className="candyInfo">
          <div>
            {/* <Link to={`/candy/${id}`}> */}
            <h2>{name}</h2>
            {/* </Link> */}
            <hr />
          </div>
          {description}
          <hr />
          Price: ${price}
          <hr />
          In Stock: {quantity}
        </div>
        <div className="candyButtons">
          <div
            className="buyButton"
            onClick={async () => {
              await axios.post(`/api/cart/${props.user.id}`, {
                quantity: 1,
                candyId: id
              })
            }}
          >
            Buy Here!
          </div>
        </div>
      </div>
    </>
  )
}


const mapState = state => ({
  user: state.user
})

export default withRouter(connect(mapState)(StudentDisplay))
