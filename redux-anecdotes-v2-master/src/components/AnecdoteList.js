import React from 'react'
import { voting } from '../reducers/anecdoteReducer'
import { votingNoted } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  render() {
    const anecdotes = this.props.store.getState().anecdotes
    
    const voteUp = (anecdote) =>{
      this.props.store.dispatch(voting(anecdote.id))
      this.props.store.dispatch(votingNoted(anecdote.content))
    }

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => 
//                  this.props.store.dispatch(voting(anecdote.id))
              voteUp(anecdote)
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
