import React from 'react'
import PropTypes from 'prop-types'
import { noteCreation } from './../reducers/noteReducer'

class NoteForm extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  addNote = (event) => {
    event.preventDefault()
    this.context.store.dispatch(
      noteCreation(event.target.note.value)
    )
    event.target.note.value = ''
  }
  render() {
    return (
      <form onSubmit={this.addNote}>
        <input name="note" />
        <button>lisää</button>
      </form>
    )
  }
}

NoteForm.contextTypes = {
  store: PropTypes.object
}

export default NoteForm