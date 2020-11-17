import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {removeCandyThunk} from '../store/candy'

const CandyDisplay = (props) => {
  const {id, name, description, price, image, quantity} = props.candy

  const {removeCandy, user} = props

  return (
    <>
      <div key={id} className="candyContainer">
        <div className="imageDiv">
          <Link to={`/candy/${id}`}>
            <img src={image} />
          </Link>
        </div>
        <div className="candyInfo">
          <div>
            <Link to={`/candy/${id}`}>
              <h2>{name}</h2>
            </Link>
            <hr />
          </div>
          {description}
          <hr />
          Price: ${price / 100}
          <hr />
          In Stock: {quantity}
        </div>
        <div className="candyButtons">
          <div
            className="buyButton"
            style={
              user.admin
                ? {
                    borderTopRightRadius: '0',
                    borderBottomRightRadius: '0',
                    borderRight: 'none',
                  }
                : {}
            }
            onClick={() => props.history.push(`/candy/${id}`)}
          >
            {user.admin ? 'Buy' : 'Buy Here!'}
          </div>
          {props.user.admin && (
            <>
              <div
                className="singleCandyCartEdit"
                onClick={() => props.history.push(`/candy/${id}`)}
              >
                Edit
              </div>
              <div
                className="sinCandyCartRemove"
                onClick={() => removeCandy(id)}
              >
                Remove
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

const mapState = (state) => ({
  user: state.user,
})

const mapDispatch = (dispatch) => ({
  removeCandy: (id) => dispatch(removeCandyThunk(id)),
})

export default withRouter(connect(mapState, mapDispatch)(CandyDisplay))
