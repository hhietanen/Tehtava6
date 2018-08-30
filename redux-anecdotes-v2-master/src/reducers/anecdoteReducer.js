//const getId = () => (100000*Math.random()).toFixed(0)

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)


import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
   console.log('ACTION: ', action)
  switch (action.type) {
    case 'VOTE':
      const old = state.filter(a => a.id !==action.id)
      const voted = state.find(a => a.id === action.id)
    return [...old, { ...voted, votes: voted.votes+1} ]
  
    case 'CREATE':
    return [...state, action.content ]

    case 'INIT_ANECDOTES':
    return action.content

    default:
    return state
  }
}

// Action creators

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll() 
    dispatch({
      type: 'INIT_ANECDOTES',
      content: anecdotes
    })
  }
}

export const creation = (content) => {
//  console.log('creation triggered')
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content) 
    dispatch({ 
      type: 'CREATE', 
      content : newAnecdote
    })
  }
}

export const voting = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.voteAnecdote(anecdote)

    dispatch({ 
      type: 'VOTE', 
      id: newAnecdote.id
    })
  }
}

export default anecdoteReducer