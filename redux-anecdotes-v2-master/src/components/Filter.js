import React from 'react'
import { changeFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
  handleChange = (event) => {
        this.props.changeFilter(event.target.value)
    // input-kentän arvo muuttujassa event.target.value
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
//    notification: state.notification,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  changeFilter
}

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter