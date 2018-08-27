import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const comboReducer = combineReducers({
  anecdotes: anecdoteReducer,
  notifications: notificationReducer
})

const store = createStore(comboReducer)
console.log(store)

export default store