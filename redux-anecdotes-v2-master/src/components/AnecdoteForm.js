import React from 'react'
import { creation } from '../reducers/anecdoteReducer'
import { addingNoted } from '../reducers/notificationReducer'
import { clearVoting } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    console.log(content)
    this.props.creation(content) 
    this.props.addingNoted(content)
    e.target.anecdote.value = ''
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
