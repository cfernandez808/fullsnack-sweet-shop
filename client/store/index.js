import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import candy from './candy'
import singleCandy from './singleCandy'
import users from './adminUsers'
import cart from './cart'

const reducer = combineReducers({user, candy, singleCandy, users, cart})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './candy'
export * from './singleCandy'
export * from './adminUsers'
export * from './cart'
