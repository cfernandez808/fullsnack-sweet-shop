import React from 'react'
import {withRouter, Link} from 'react-router-dom'

const StudentDisplay = props => {
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
            <h3>{name}</h3>
            {/* </Link> */}
            <hr />
          </div>
          {description}
          <hr />
          {price}
          <hr />
          {quantity}
          <div className="candyButtons">
            <div className="buyButton">Buy Here!</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(StudentDisplay)
