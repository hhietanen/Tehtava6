import React from 'react'



class Notification extends React.Component {
  render() {
   console.log(this.props.store.getState().notifications)
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={this.props.store.getState().notifications!== null ? style: null}>
           {this.props.store.getState().notifications}
      </div>
    )
  }
}

export default Notification
