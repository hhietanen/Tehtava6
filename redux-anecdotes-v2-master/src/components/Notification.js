import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {

  render() {
  let {notifications} = this.props
  console.log(notifications)
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={notifications!== ' ' ? style: null}>
           {notifications}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

export default connect(
  mapStateToProps,
)(Notification)

