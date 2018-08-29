import { createStore, combineReducers, applyMiddleware} from 'redux'
import anecdoteReducer,  { anecdoteInitialization } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteService from './services/anecdotes'
import thunk from 'redux-thunk'

const comboReducer = combineReducers({
  anecdotes: anecdoteReducer,
  notifications: notificationReducer,
  filter: filterReducer
})

const store = createStore(comboReducer, applyMiddleware(thunk))

anecdoteService.getAll().then(anecdotes =>
    store.dispatch(anecdoteInitialization(anecdotes))
)

export default store