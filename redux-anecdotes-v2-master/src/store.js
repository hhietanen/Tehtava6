import { createStore, combineReducers } from 'redux'
import anecdoteReducer,  { anecdoteInitialization } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteService from './services/anecdotes'

const comboReducer = combineReducers({
  anecdotes: anecdoteReducer,
  notifications: notificationReducer,
  filter: filterReducer
})

const store = createStore(comboReducer)

anecdoteService.getAll().then(anecdotes =>
    store.dispatch(anecdoteInitialization(anecdotes))
)


export default store 