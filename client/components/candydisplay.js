import React from 'react'
import {withRouter, Link} from 'react-router-dom'

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
          <div className="buyButton">Buy Here!</div>
        </div>
      </div>
    </>
  )
}

export default withRouter(CandyDisplay)
