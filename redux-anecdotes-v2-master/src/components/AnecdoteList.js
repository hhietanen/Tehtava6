import React from 'react'
import { voting } from '../reducers/anecdoteReducer'
import { votingNoted } from '../reducers/notificationReducer'
import { clearVoting } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


class AnecdoteList extends React.Component {
  render() {

    let {anecdotes, filter } = this.props
    console.log(anecdotes)
    console.log(filter)
    
    anecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
       
    const voteUp = (anecdote) =>{
      this.props.voting(anecdote.id)
      this.props.votingNoted(anecdote.content)
      setTimeout(() => {
          this.props.clearVoting()
      }, 5000)
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

const anecdotesToShow = (anecdotes, filter) => {
    return anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase()
      .includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  clearVoting,
  voting,
  votingNoted
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
