import React from 'react'
import { voting } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  render() {

    let {anecdotes, filter } = this.props
    // console.log(anecdotes)
    // console.log(filter)
    
    //filters the displayed anecdotes
    anecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    

    const voteUp = async (anecdote) =>{
      await this.props.voting(anecdote)
      this.props.notify(anecdote.content, 10)
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
  console.log(anecdotes)
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
  voting,
  notify
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
