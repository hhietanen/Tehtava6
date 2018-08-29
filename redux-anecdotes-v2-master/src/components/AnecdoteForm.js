import React from 'react'
import { creation } from '../reducers/anecdoteReducer'
import { addingNoted } from '../reducers/notificationReducer'
import { clearVoting } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
//    console.log(e.target.anecdote.value)
    e.target.anecdote.value = ''
//    const newAnecdote = await anecdoteService.createNew(content)
//    console.log(newAnecdote)
//    this.props.creation(newAnecdote)
    this.props.creation(content)
    this.props.addingNoted(content)
    setTimeout(() => {
      this.props.clearVoting()
    }, 5000)
  }

   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
     )
   }
}


const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  addingNoted,
  creation,
  clearVoting
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps, 
  mapDispatchToProps  
)(AnecdoteForm)

export default ConnectedAnecdoteForm
